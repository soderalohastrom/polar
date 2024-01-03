import { upload } from '@vercel/blob/client'
import {
  ChangeEventHandler,
  ClipboardEvent,
  DragEventHandler,
  KeyboardEventHandler,
  useCallback,
  useRef,
} from 'react'

const uploadingText = 'Uploading...'

export interface EditorHelpers {
  ref: React.RefObject<HTMLTextAreaElement>
  insertText: (text: string) => void
  insertTextAtCursor: (text: string) => void
  wrapSelectionWithText: (text: [string, string]) => void
  handleChange: ChangeEventHandler<HTMLTextAreaElement>
  handleDrag: DragEventHandler<HTMLTextAreaElement>
  handleDrop: DragEventHandler<HTMLTextAreaElement>
  handlePaste: (e: ClipboardEvent<HTMLTextAreaElement>) => void
  handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement>
  handleDragOver: DragEventHandler<HTMLTextAreaElement>
}

export const useEditorHelpers = (
  onChange?: (value: string) => void,
): EditorHelpers => {
  const ref = useRef<HTMLTextAreaElement>(null)

  const getTextSelection = useCallback((): [string, string, string] | null => {
    if (!ref.current) {
      return null
    }

    const selectionStart = ref.current.selectionStart
    const selectionEnd = ref.current.selectionEnd

    const textBeforeSelection = ref.current.value.substring(0, selectionStart)

    const textInSelection = ref.current.value.substring(
      selectionStart,
      selectionEnd,
    )

    const textAfterSelection = ref.current.value.substring(
      selectionEnd,
      ref.current.value.length,
    )

    return [textBeforeSelection, textInSelection, textAfterSelection]
  }, [ref])

  const insertText = useCallback(
    (text: string, fireOnChange = true) => {
      if (ref.current) {
        ref.current.value += text

        if (fireOnChange) {
          onChange?.(ref.current.value)
        }
      }
    },
    [ref, onChange],
  )

  const insertTextAtCursor = useCallback(
    (text: string, fireOnChange = true) => {
      if (ref.current) {
        const cursorPosition = ref.current.selectionStart

        const textBeforeCursorPosition = ref.current.value.substring(
          0,
          cursorPosition,
        )
        const textAfterCursorPosition = ref.current.value.substring(
          cursorPosition,
          ref.current.value.length,
        )

        ref.current.value =
          textBeforeCursorPosition + text + textAfterCursorPosition

        ref.current.selectionStart = cursorPosition + text.length
        ref.current.selectionEnd = cursorPosition + text.length

        if (fireOnChange) {
          onChange?.(ref.current.value)
        }
      }
    },
    [ref, onChange],
  )

  const wrapSelectionWithText = useCallback(
    ([before, after]: [string, string], fireOnChange = true) => {
      const textSelection = getTextSelection()
      if (ref.current && textSelection) {
        const [textBeforeSelection, textInSelection, textAfterSelection] =
          textSelection

        const selectionStart = ref.current.selectionStart
        const selectionEnd = ref.current.selectionEnd

        const newVal = before + textInSelection + after

        ref.current.focus()
        document.execCommand('insertText', false, newVal)

        ref.current.selectionStart = selectionStart + before.length
        ref.current.selectionEnd = selectionEnd + before.length

        if (fireOnChange) {
          onChange?.(ref.current.value)
        }
      }
    },
    [ref, getTextSelection, onChange],
  )

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      onChange?.(e.target.value)
    },
    [onChange],
  )

  const handleDrag: DragEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop: DragEventHandler<HTMLTextAreaElement> = useCallback(
    async (e) => {
      if (e.target instanceof HTMLTextAreaElement) {
        e.preventDefault()
        e.stopPropagation()

        for (const file of e.dataTransfer.files) {
          try {
            insertTextAtCursor(uploadingText, false)

            const newBlob = await upload(file.name, file, {
              access: 'public',
              handleUploadUrl: '/api/blob/upload',
            })

            const textToInsert = `![${newBlob.pathname}](${newBlob.url})`

            e.target.value = e.target.value.replace(uploadingText, textToInsert)
          } catch (err) {
            e.target.value = e.target.value.replace(uploadingText, '')
          } finally {
            onChange?.(e.target.value)
          }
        }
      }
    },
    [onChange, insertTextAtCursor],
  )

  const handlePaste = useCallback(
    async (e: ClipboardEvent<HTMLTextAreaElement>) => {
      if (!(e.target instanceof HTMLTextAreaElement)) {
        return
      }

      // Handle files
      if (e.clipboardData.files.length > 0) {
        e.preventDefault()
        e.stopPropagation()

        for (const file of e.clipboardData.files) {
          try {
            insertTextAtCursor(uploadingText, false)

            const newBlob = await upload(file.name, file, {
              access: 'public',
              handleUploadUrl: '/api/blob/upload',
            })

            const textToInsert = `![${newBlob.pathname}](${newBlob.url})`

            e.target.value = e.target.value.replace(uploadingText, textToInsert)
          } catch (err) {
            e.target.value = e.target.value.replace(uploadingText, '')
          } finally {
            onChange?.(e.target.value)
          }
        }

        return
      }

      // Handle URL paste
      const textData = e.clipboardData.getData('text/plain')
      const textSelection = getTextSelection()
      if (textSelection && textSelection[1] !== '') {
        try {
          new URL(textData)
          e.preventDefault()
          e.stopPropagation()
          wrapSelectionWithText(['[', `](${textData})`])
        } catch {}
      }
    },
    [onChange, insertTextAtCursor, getTextSelection, wrapSelectionWithText],
  )

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      if (!(e.target instanceof HTMLTextAreaElement)) {
        return
      }

      const isCtrlPressed = e.ctrlKey || e.metaKey
      const key = e.key

      // Insert tab
      if (key === 'Tab') {
        e.preventDefault()
        insertTextAtCursor('\t')
        return
      }

      // Bold
      if (isCtrlPressed && e.key === 'b') {
        e.preventDefault()
        wrapSelectionWithText(['**', '**'])
        return
      }

      // Italic
      if (isCtrlPressed && e.key === 'i') {
        e.preventDefault()
        wrapSelectionWithText(['*', '*'])
        return
      }

      // Inline code
      if (isCtrlPressed && e.key === 'e') {
        e.preventDefault()
        wrapSelectionWithText(['`', '`'])
        return
      }

      // Link
      if (isCtrlPressed && e.key === 'k') {
        e.preventDefault()
        const textSelection = getTextSelection()

        if (textSelection) {
          const [, textInSelection] = textSelection
          // Wrap an URL
          try {
            new URL(textInSelection)
            wrapSelectionWithText(['[](', ')'])
            // Wrap a label
          } catch {
            wrapSelectionWithText(['[', '](url)'])
          }
        }
        return
      }
    },
    [insertTextAtCursor, wrapSelectionWithText, getTextSelection],
  )

  const handleDragOver: DragEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
    },
    [],
  )

  return {
    ref,
    insertText,
    insertTextAtCursor,
    wrapSelectionWithText,
    handleChange,
    handleDrag,
    handleDrop,
    handlePaste,
    handleKeyDown,
    handleDragOver,
  }
}
