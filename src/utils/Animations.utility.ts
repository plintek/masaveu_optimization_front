class AnimationUtility {
    static scaleIn = ({ duration = 0.4, delay = 0, ease = [0, 0.52, 0.72, 1] }) => {
        const transition = { duration, ease, delay };
        const animation = {
            initial: { scale: 0.9, opacity: 0 },
            enter: { scale: 1, opacity: 1, transition },
            exit: {
                scale: 0.3,
                opacity: 0,
                transition,
            },
        };

        return animation;
    };
}

export default AnimationUtility;
