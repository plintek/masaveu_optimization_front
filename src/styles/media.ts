export const deviceSizes = {
    mobileS: "320px",
    mobileM: "375px",
    mobileL: "480px",
    tablet: "768px",
    laptop: "1024px",
    laptopL: "1440px",
    desktop: "1920px",
};

export const media = (condition: string): string => `@media ${condition}`;
export const mediaMaxWidth = (size: string): string => media(`(max-width: ${size})`);
export const mediaMinWidth = (size: string): string => media(`(min-width: ${size})`);
