export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        screens: {
            lg: '65em',
            page: '80rem'
        },

        extend: {
            colors: {
                black: {
                    100: '#606060',
                    200: '#545454',
                    300: '#484848',
                    400: '#3c3c3c',
                    500: '#303030',
                    600: '#242424',
                    700: '#181818',
                    800: '#0c0c0c',
                    900: '#000000'
                }
            },
            fontFamily: {
                sans: 'Geist'
            }
        }
    }
}
