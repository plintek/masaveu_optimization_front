class GeolocationUtility {
    static apiKey = "KHKPpYn2p2aNvLQwUOA1TwbTRJa6n-ntaitcRBkCwag";

    static suggetsLocation = async (query: string) => {
        const url = `https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=${GeolocationUtility.apiKey}&q=${query}&in=circle:40.2043047,-4.6468379;r=1000000&limit=10&lang=en`;

        return await fetch(url);
    };
}

export default GeolocationUtility;
