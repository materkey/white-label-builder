import React from 'react'

const LogoSvgComponent = props => (
  <svg width={116} height={37} fill="none" {...props}>
    <g
      clipPath="url(#prefix__clip0)"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="#fff"
    >
      <path d="M19.93 28.626c-.061-.574.29-3.399.29-3.399s.709.118 1.392.192c.683.075 1.782.134 1.782.134s-.593 2.12-.249 2.603c.796 1.118 5.143 3.88 6.14 4.988.501.493 1.01.971 1.633 1.402.44.37 1.86.412 2.233.782.25.267.555 1.045.402 1.186-.105.096-2.256.143-2.635.075-.411 0-.903-.391-.903-.391s-.305.316-.73.092c-.747-.368-.636-1.128-1.072-1.744-.25-.247-3.904-2.622-6.258-3.936-2.02-1.126-1.93-1.11-2.024-1.984zM5.403 21.314c-.438-.385-2.055.984-2.518.885-.462-.099-.01-1.23-.42-1.16-.555.093-.703 1.378-1.202 1.478C.457 22.816 0 21.625 0 20.203c0-1.422.511-2.971 2.254-3.963 1.742-.992 4.322-1.245 6.323-.58 1.9-1.006 4.4-3.924 9.966-4.06 5.566-.137 7.65 2.613 8.833 1.955 1.183-.659 1.583-2.144 1.326-3.253-.493-2.124-1.45-3.28-2.215-5.171-.48-1.187-.506-2.755.099-3.905.272-.51.931-1.106 1.926-1.216.994-.11 1.256.717 1.952.942.696.226 2.184.364 2.3.889.117.524-1.669.937-2.073.894-.948-.1-1.546.53-1.495 1.644.061 1.417.398 1.923 1.719 3.94 1.32 2.016 1.309 5.37-.378 7.709-.532.683-1.098 1.264-1.474 2.045-.302.627 0-.635 0 1.864s-1.274 3.701-2.939 4.23c-2.24.71-4.176.445-6.156.214-2.739-.32-4.882-.282-6 0-.97.245-4.004 1.938-4.378 2.726-.198.425-1.269 4.851-1.465 5.824-.08.4-.035 1.196-.223 1.551-.205.394-2.701 1.95-3.55 2.27-.39.148-1.178.337-1.272.201-.552-.628-.55-.774 1.055-1.92-.56-1.15 1.057-1.43 1.533-1.998.519-.617 1.46-7.333 1.784-8.208.322-.875 1.583-1.176 2.094-1.954-.242-.276-.577-.129-1.462.116-.76.212-2.346.77-2.682.491-.337-.279.437-1.782 0-2.166zM49.06 17.349h-5.147V4.355h5.127c4.074 0 6.9 2.59 6.9 6.487 0 3.935-2.826 6.507-6.88 6.507zm-.02-2.436c2.573 0 4.074-1.85 4.074-4.071 0-2.28-1.404-4.052-4.055-4.052h-2.378v8.123h2.359zm13.236 2.67c-2.866 0-5.03-1.93-5.03-4.949 0-2.727 2.028-4.929 4.874-4.929 2.826 0 4.717 2.104 4.717 5.163v.584H59.84c.175 1.15 1.111 2.104 2.71 2.104.799 0 1.89-.33 2.495-.915l1.111 1.636c-.936.857-2.417 1.305-3.88 1.305zm2.183-5.845c-.078-.896-.702-2.006-2.34-2.006-1.54 0-2.202 1.071-2.3 2.006h4.64zm6.823 5.844c-1.735 0-2.651-.896-2.651-2.59V4.354h2.475v9.974c0 .604.312 1.052.858 1.052.37 0 .721-.136.858-.292l.526 1.89c-.37.33-1.052.603-2.066.603zm4.386-10.656c-.8 0-1.462-.662-1.462-1.48a1.46 1.46 0 0 1 1.462-1.461c.819 0 1.481.642 1.481 1.46a1.48 1.48 0 0 1-1.481 1.481zm1.247 10.423H74.44v-9.41h2.475v9.41zm7.564 0h-2.67l-3.782-9.41h2.65l2.457 6.546 2.476-6.546h2.65l-3.781 9.41zm9.318.233c-2.866 0-5.03-1.928-5.03-4.948 0-2.727 2.028-4.929 4.874-4.929 2.826 0 4.717 2.104 4.717 5.163v.584H91.36c.176 1.15 1.111 2.104 2.71 2.104.799 0 1.89-.33 2.495-.915l1.111 1.636c-.936.857-2.417 1.305-3.88 1.305zm2.183-5.844c-.078-.896-.702-2.006-2.34-2.006-1.54 0-2.202 1.071-2.3 2.006h4.64zm6.647 5.61h-2.475V7.94h2.475v1.267c.683-.819 1.833-1.5 3.002-1.5v2.415a3.158 3.158 0 0 0-.682-.058c-.819 0-1.91.467-2.32 1.071v6.215zm8.363 3.819c-1.579 0-2.846-.448-3.938-1.403l1.112-1.773c.682.819 1.832 1.15 2.826 1.15 1.599 0 2.534-1.091 2.534-2.416v-.974a4.478 4.478 0 0 1-3.314 1.422c-2.066 0-3.041-1.13-3.041-2.96V7.938h2.476v5.3c0 1.304.682 1.733 1.735 1.733.955 0 1.715-.526 2.144-1.072V7.94H116v8.785c0 2.825-2.008 4.442-5.01 4.442zM50.009 35.292c-3.918 0-6.94-2.727-6.94-6.72 0-4.014 3.022-6.722 6.94-6.722 2.846 0 4.503 1.54 5.42 3.176l-2.379 1.169c-.546-1.052-1.715-1.89-3.041-1.89-2.378 0-4.094 1.812-4.094 4.266 0 2.455 1.716 4.267 4.094 4.267 1.326 0 2.495-.838 3.041-1.89l2.378 1.15c-.916 1.616-2.573 3.194-5.419 3.194zm9.889 0c-1.735 0-2.652-.896-2.652-2.59V22.064h2.476v9.974c0 .604.312 1.052.858 1.052.37 0 .721-.136.858-.292l.526 1.89c-.37.33-1.053.603-2.066.603zm11.988-.233H69.41V33.87a4.479 4.479 0 0 1-3.313 1.422c-2.067 0-3.041-1.13-3.041-2.96v-6.683h2.475v5.708c0 1.305.682 1.734 1.735 1.734.955 0 1.716-.526 2.144-1.072v-6.37h2.476v9.41zm4.932-3.02c.429.604 1.326 1.052 2.144 1.052 1.423 0 2.379-1.11 2.379-2.747 0-1.617-.956-2.727-2.379-2.727-.819 0-1.715.467-2.144 1.09v3.332zm0 3.02h-2.476V22.065h2.476v4.792a3.572 3.572 0 0 1 2.904-1.441c2.398 0 4.172 1.87 4.172 4.928 0 3.156-1.793 4.948-4.172 4.948-1.13 0-2.163-.506-2.904-1.441v1.208z" />
    </g>
    <defs>
      <clipPath id="prefix__clip0">
        <path fill="#fff" d="M0 0h116v37H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default LogoSvgComponent
