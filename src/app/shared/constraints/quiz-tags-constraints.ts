import { IQuizTag } from '@quiz/models/data-models';


export const QuizTagsConstraints: { [key: string]: IQuizTag } = {
    DOTA2: {
        type: 'dota2',
        displayName: 'Dota 2',
    },
    ZXC: {
        type: 'zxc',
        displayName: 'ZXC',
    },
    CIV6: {
        type: 'civ6',
        displayName: 'Civilization 6',
    },
    GHOULS: {
        type: 'ghouls',
        displayName: 'Stockgholme quiz',
    },
    NORMAL: {
        type: 'normal',
        displayName: 'For normal people',
    },
    MAMMALS: {
        type: 'mammals',
        displayName: 'Mammals',
    },
    FOOD: {
        type: 'food',
        displayName: 'Food',
    },
    OCEAN: {
        type: 'ocean',
        displayName: 'Ocean',
    },

};
