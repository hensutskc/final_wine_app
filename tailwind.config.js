module.exports = {
    theme: {
        extend: {
            animation: {
                marquee: 'marquee 5s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            }
        }
    }
}