import { Grid } from '../Grid'
import { Link } from '../Link'
import { Section } from '../Section'

export const InvestorsSection = () => {
  return (
    <Section
      header={{ index: '06', name: 'Investors' }}
      title="Venture Capital & Angels"
      context={
        <div className="flex flex-col gap-12 md:flex-row md:items-start">
          <Grid
            className="grid-cols-2 md:grid-cols-1"
            items={[
              <div
                key="a"
                className="bg-polar-200 absolute bottom-2 right-2 z-10 flex h-full w-full flex-col items-center justify-center p-6 text-black md:bottom-4 md:right-4"
              >
                <AbstractLogo />
              </div>,
              <div
                key="b"
                className="flex h-full flex-col items-center justify-center p-6"
                style={{
                  background:
                    'repeating-linear-gradient(-45deg, transparent 0px, transparent 9px, hsl(233, 8%, 24%) 9px, hsl(233, 8%, 24%) 10px)',
                }}
              >
                <MischiefLogo />
              </div>,
            ]}
          />
          <Grid
            className="grid-cols-2 md:grid-cols-4"
            items={[
              <AngelProfile key="A" name="John Doe" company="Company A" />,
              <AngelProfile key="B" name="Jane Doe" company="Company B" />,
              <AngelProfile key="C" name="John Doe" company="Company C" />,
              <AngelProfile key="D" name="Jane Doe" company="Company D" />,
              <AngelProfile key="E" name="John Doe" company="Company E" />,
              <AngelProfile key="F" name="Jane Doe" company="Company F" />,
              <AngelProfile key="G" name="John Doe" company="Company G" />,
              <AngelProfile key="H" name="Jane Doe" company="Company H" />,
              <AngelProfile key="I" name="John Doe" company="Company I" />,
              <AngelProfile key="J" name="Jane Doe" company="Company J" />,
              <AngelProfile key="K" name="John Doe" company="Company K" />,
              <AngelProfile key="L" name="Jane Doe" company="Company L" />,
              <AngelProfile key="M" name="John Doe" company="Company M" />,
              <AngelProfile key="N" name="Jane Doe" company="Company N" />,
              <AngelProfile key="O" name="John Doe" company="Company O" />,
              <AngelProfile key="P" name="Jane Doe" company="Company P" />,
            ]}
          />
        </div>
      }
    >
      <p>
        What used to be a simple way to pay for things has become a complex
        mess.
      </p>
      <p>
        Software as a Service (SaaS) has become the norm, but the underlying
        payment infrastructure has not evolved.
      </p>
      <p>
        This is why we are building Polar 2.0, payment infrastructure for the
        21st century.
      </p>
      <Link href="/pitch/what">Why →</Link>
    </Section>
  )
}

const AngelProfile = ({ name, company }: { name: string; company: string }) => {
  return (
    <div className="flex h-full w-fit flex-col justify-center gap-y-1 px-4 text-left text-xs">
      <h4>{name}</h4>
      <span className="text-polar-500">{company}</span>
    </div>
  )
}

const AbstractLogo = () => {
  return (
    <svg
      width="100%"
      height="auto"
      viewBox="0 0 180 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: '160px', maxHeight: '35px' }}
    >
      <g clip-path="url(#clip0_3_2)">
        <path
          d="M0 31.473C1.415 31.473 2.733 31.373 4.1 27.96L14.687 1.708H17.761L27.911 27.179C29.228 30.448 30.351 31.473 32.059 31.473V33.673H20.347V31.619C23.226 31.473 24.447 30.497 23.275 27.471L21.275 22.299H9.515L7.615 27.227C6.542 30.008 7.029 31.619 10.055 31.619V33.668H0V31.473ZM20.25 19.616L15.419 6.978L10.54 19.616H20.25Z"
          fill="currentColor"
        />
        <path
          d="M34.992 32.79V4.879L31.235 4.199V2.635L37.871 -0.001H39.042V15.077C41.531 12.101 43.482 10.929 46.312 10.929C51.631 10.929 55.241 15.129 55.241 21.371C55.241 28.251 50.801 34.204 42.941 34.204C40.2311 34.1599 37.5458 33.6822 34.987 32.789M44.258 32.057C48.158 32.057 50.797 28.3 50.797 22.884C50.797 17.712 48.406 14.247 44.21 14.247C43.2067 14.2489 42.2175 14.4835 41.3201 14.9322C40.4227 15.3809 39.6415 16.0315 39.038 16.833V26.886C39.0083 27.5773 39.1235 28.2672 39.376 28.9113C39.6286 29.5555 40.013 30.1398 40.5045 30.6268C40.9961 31.1138 41.584 31.4926 42.2306 31.7391C42.8771 31.9855 43.568 32.0942 44.259 32.058"
          fill="currentColor"
        />
        <path
          d="M61.48 31.862L58.943 34.009H58.065L57.528 25.958H59.48C61.334 30.058 63.872 31.813 67.043 31.813C69.434 31.813 71.143 30.642 71.143 28.544C71.143 27.227 70.46 25.909 68.069 24.982L64.117 23.469C60.311 22.005 58.457 20.151 58.457 17.174C58.457 13.319 61.677 10.879 65.581 10.879C66.5297 10.8481 67.4734 11.0295 68.343 11.4102C69.2126 11.7908 69.9861 12.361 70.607 13.079L73.144 11.029H73.974V18.251H72.02C70.41 14.251 68.458 13.274 66.213 13.274C63.676 13.274 62.213 14.542 62.213 16.348C62.213 17.714 63.043 18.739 65.189 19.52L69.532 21.081C73.045 22.349 74.948 24.399 74.948 27.473C74.948 31.279 72.02 34.207 67.531 34.207C65.291 34.2133 63.1308 33.3761 61.48 31.862Z"
          fill="currentColor"
        />
        <path
          d="M81.445 27.618L81.591 14.395H77.785V11.711H80.322L84.567 6.392H85.494V11.711H92.472V14.395H85.494V26.695C85.494 29.476 86.763 30.94 89.202 30.94C90.6033 30.8974 91.9401 30.3419 92.959 29.379L93.691 30.257C92.227 32.55 90.178 34.157 87.64 34.157C83.932 34.157 81.394 32.157 81.44 27.618"
          fill="currentColor"
        />
        <path
          d="M99.254 28.545V16.102L95.936 15.419V13.955L101.743 11.32H103.304V15.52C106.378 12.104 107.988 11.177 109.647 11.177C109.98 11.1482 110.315 11.1884 110.631 11.2952C110.948 11.4019 111.239 11.5729 111.486 11.7974C111.734 12.0218 111.932 12.295 112.069 12.5996C112.206 12.9043 112.278 13.234 112.282 13.568C112.239 14.2147 112.027 14.8387 111.667 15.378C111.308 15.9173 110.813 16.3531 110.233 16.642L106.72 14.642C105.411 15.2516 104.246 16.1331 103.304 17.228V29.033C103.304 31.18 103.987 31.717 106.72 31.717H107.452V33.669H95.692V31.714C98.522 31.714 99.254 31.177 99.254 28.542"
          fill="currentColor"
        />
        <path
          d="M125.507 30.448C123.407 33.181 121.507 34.205 119.359 34.205C118.697 34.2353 118.037 34.1273 117.419 33.8879C116.802 33.6485 116.241 33.283 115.772 32.8146C115.304 32.3463 114.938 31.7855 114.699 31.1679C114.46 30.5503 114.352 29.8896 114.382 29.228C114.382 26.349 116.187 24.641 119.701 23.228L125.459 20.983V19.083C125.459 16.107 124.044 14.35 121.259 14.35C119.307 14.35 117.551 15.326 115.648 17.912L114.038 16.839C116.771 12.399 119.796 10.939 122.772 10.939C126.872 10.939 129.506 13.769 129.506 18.502V29.13C129.506 30.252 129.896 31.03 131.165 31.03C131.57 31.0072 131.967 30.9 132.328 30.7153C132.69 30.5305 133.009 30.2722 133.265 29.957L133.558 31.177C131.85 33.47 130.679 34.202 129.215 34.202C127.015 34.202 125.799 32.543 125.507 30.445M121.359 30.884C122.903 30.8136 124.365 30.17 125.459 29.079V23.57L121.799 24.4C119.457 24.986 118.383 26.3 118.383 28.108C118.371 28.4934 118.441 28.877 118.589 29.2332C118.737 29.5893 118.959 29.9097 119.241 30.173C119.522 30.4363 119.857 30.6364 120.222 30.7598C120.588 30.8833 120.975 30.9274 121.359 30.889"
          fill="currentColor"
        />
        <path
          d="M134.154 23.422C134.131 21.8169 134.424 20.223 135.017 18.7313C135.61 17.2395 136.491 15.8793 137.61 14.7283C138.728 13.5772 140.063 12.658 141.538 12.0231C143.012 11.3882 144.597 11.05 146.202 11.028C149.911 11.028 152.253 12.638 152.253 14.59C152.185 15.2519 151.882 15.8675 151.398 16.3244C150.915 16.7813 150.283 17.0491 149.618 17.079L145.418 13.029C141.466 13.517 138.245 16.884 138.245 22.056C138.245 26.399 140.49 30.4 145.662 30.4C148.394 30.4 150.444 29.327 152.152 26.4L153.372 27.425C151.225 32.304 147.761 34.207 143.955 34.207C138.1 34.207 134.148 29.23 134.148 23.423"
          fill="currentColor"
        />
        <path
          d="M158.596 27.618L158.742 14.395H154.936V11.711H157.473L161.718 6.392H162.645V11.711H169.623V14.395H162.645V26.695C162.645 29.476 163.914 30.94 166.353 30.94C167.754 30.8974 169.091 30.3419 170.11 29.379L170.842 30.257C169.378 32.55 167.329 34.157 164.791 34.157C161.083 34.157 158.545 32.157 158.591 27.618"
          fill="currentColor"
        />
        <path
          d="M174.167 31.717C174.167 31.1883 174.323 30.6713 174.616 30.2311C174.909 29.7908 175.325 29.4468 175.813 29.2423C176.3 29.0378 176.838 28.9819 177.357 29.0815C177.876 29.1812 178.354 29.432 178.732 29.8025C179.109 30.173 179.368 30.6466 179.477 31.164C179.586 31.6814 179.54 32.2194 179.344 32.7106C179.149 33.2018 178.812 33.6243 178.378 33.925C177.943 34.2258 177.429 34.3913 176.9 34.401C176.542 34.4113 176.187 34.3492 175.854 34.2186C175.521 34.0879 175.217 33.8914 174.962 33.6408C174.707 33.3902 174.505 33.0906 174.368 32.76C174.232 32.4294 174.163 32.0747 174.167 31.717Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3_2">
          <rect width="179.535" height="34.4" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  )
}

const MischiefLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="auto"
      viewBox="0 0 110 60"
      fill="none"
      style={{ maxWidth: '100px', maxHeight: '60px' }}
    >
      <path
        d="M27.2836 0.400391C23.8295 0.400391 21.7149 1.81392 19.6003 4.46621C18.1765 1.72764 15.7586 0.400391 12.9089 0.400391C10.0592 0.400391 7.68556 1.51307 5.74369 3.61013V0.999867H0V23.7313H5.74148V12.6023C5.74148 7.93697 7.81399 5.62534 10.6637 5.62534C13.8588 5.62534 14.7224 8.32188 14.7224 12.7306V23.7313H20.4638V12.516C20.4638 7.8507 22.5364 5.62313 25.4281 5.62313C28.0188 5.62313 29.3562 7.46359 29.3562 11.1887V23.7313H35.0976V10.4189C35.0976 7.42156 34.9249 4.93959 33.4148 3.0549C32.1195 1.42901 29.8322 0.400391 27.2859 0.400391H27.2836Z"
        fill="currentColor"
      />
      <path d="M46.9602 1H41.2188V23.7314H46.9602V1Z" fill="currentColor" />
      <path
        d="M65.3039 9.94555L63.1893 8.8749C61.9382 8.23339 61.1168 7.84849 61.1168 6.99241C61.1168 6.09431 62.0224 5.62313 63.1893 5.62313C64.571 5.62313 65.8663 6.43718 67.1616 7.72019L70.7021 4.16758C68.8466 1.72764 66.1253 0.400391 63.1472 0.400391C58.7431 0.400391 55.7229 3.39777 55.7229 6.95038C55.7229 9.81946 57.5784 12.0448 61.2496 13.8853L63.1915 14.8697C64.788 15.6837 65.7379 16.4115 65.7379 17.3959C65.7379 18.3802 64.6152 19.2363 63.1915 19.2363C61.6814 19.2363 59.7373 18.1236 58.3999 16.5818L54.8594 20.4353C56.8455 23.0035 59.5646 24.3308 62.8881 24.3308C67.8967 24.3308 71.1339 21.2913 71.1339 17.2255C71.1339 13.8432 69.1057 11.8745 65.3061 9.94776L65.3039 9.94555Z"
        fill="currentColor"
      />
      <path
        d="M12.734 54.1298C8.50261 54.1298 5.78355 51.3912 5.78355 47.5377C5.78355 43.6843 8.58897 40.6449 12.9931 40.6449C15.4973 40.6449 17.0938 41.501 18.7345 43.2131L23.5261 40.6006C21.2388 37.2626 17.4392 35.4199 12.951 35.4199C5.35399 35.4199 0 40.6427 0 47.4493C0 54.2558 5.05063 59.3503 12.8646 59.3503C17.3551 59.3503 20.807 57.7664 23.2693 54.5987L18.7367 51.5173C17.313 53.2715 15.2826 54.1298 12.7362 54.1298H12.734Z"
        fill="currentColor"
      />
      <path
        d="M41.8786 35.422C39.4186 35.422 37.3018 36.4484 35.1009 38.3331V27.2461H29.3594V58.7529H35.1009V49.0794C35.1009 46.7257 35.0145 44.6707 36.1792 42.8723C37.0848 41.4588 38.4665 40.6469 40.0651 40.6469C43.433 40.6469 43.9932 43.3855 43.9932 48.0088V58.7529H49.7347V43.7261C49.7347 38.2048 46.1941 35.422 41.8786 35.422Z"
        fill="currentColor"
      />
      <path
        d="M62.9993 36.0195H57.2578V58.7509H62.9993V36.0195Z"
        fill="currentColor"
      />
      <path
        d="M80.7663 35.4221C73.3841 35.4221 68.8516 41.1581 68.8516 47.3652C68.8516 54.0435 73.5568 59.3503 80.8526 59.3503C85.6885 59.3503 88.9257 57.8085 91.3857 54.3421L86.5498 52.0725C84.9534 53.6143 83.3126 54.2979 80.8526 54.2979C77.5712 54.2979 74.9805 52.4154 74.4203 49.0331H92.8958C92.8958 48.5199 92.9401 48.2633 92.9401 47.7479C92.9401 40.5564 88.0179 35.4199 80.7663 35.4199V35.4221ZM74.6794 44.5404C75.802 41.6713 78.0029 40.26 80.8526 40.26C83.9171 40.26 86.3793 41.8859 87.1543 44.5404H74.6794Z"
        fill="currentColor"
      />
      <path
        d="M99.9006 36.0213H97.8281V40.8592H99.9006V58.7527H105.642V40.8592H109.269V36.0213H105.642C105.684 32.597 105.21 31.4401 107.456 31.4401C108.188 31.4401 108.966 31.6547 109.528 31.825V27.4605C108.578 27.1177 107.327 26.6465 105.469 26.6465C99.4268 26.6465 99.9427 30.9269 99.9006 36.0213Z"
        fill="currentColor"
      />
    </svg>
  )
}
