const contents = require('./../data/content.json');

const getContent = async (contentId: string) => {
    return contents[contentId];
}

const getEpisode = async (contentId: string, episodeId:string) => {
    return contents[contentId][episodeId];
}

export {
    getContent,
    getEpisode
}
