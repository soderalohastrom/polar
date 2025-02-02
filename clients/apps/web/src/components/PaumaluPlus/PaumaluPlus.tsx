import React from 'react'

interface PaumaluPlusProps {
  isSubscribed: boolean
  onSubscribe: () => void
}

const PaumaluPlus: React.FC<PaumaluPlusProps> = ({
  isSubscribed,
  onSubscribe,
}) => {
  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        maxWidth: '400px',
        margin: '20px auto',
      }}
    >
      <h2>Paumalu Plus</h2>
      <p>
        Unlock premium features with Paumalu Plus. Get access to advanced tools,
        priority support, and exclusive content.
      </p>
      {isSubscribed ? (
        <p style={{ color: 'green' }}>You are subscribed to Paumalu Plus!</p>
      ) : (
        <button
          onClick={onSubscribe}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Subscribe to Paumalu Plus
        </button>
      )}
    </div>
  )
}

export default PaumaluPlus
