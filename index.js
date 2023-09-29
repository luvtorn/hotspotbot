const TelegramApi = require('node-telegram-bot-api')

const token = '6328011279:AAE3qpCyJjxbZiHGmlRdHW6wxddVmrwACl0'

const bot = new TelegramApi(token, { polling: true })

bot.setMyCommands([
    { command: '/start', description: 'Старт' },
    { command: '/info', description: 'Информация' },
    { command: '/liquids', description: 'Жидкость' },
    { command: '/reviews', description: 'Отзывы' },
    { command: '/chat', description: 'Чат' },
    { command: '/language', description: 'Change language' },
])

const languageRu = {
    welcomeMessage: `Добро пожаловать! Прежде чем начать - выбери язык /language`,
    infoMessage: 'Мы занимаемся продажей качественнoй жидкости HOT SPOT и других жидкостей в Белостоке. Работаем уже как полгода, и с каждым днем, радуем наших клиентов высоким качеством жидкости. Если вы заинтересовались в покупке жидкости, то пропишите команду /liquids и вы попадете в категорию жидкостей!',
    reviewMessage: 'Отзывы уже доступны, если вы хотите написать отзыв или посмотреть переходи - https://t.me/+11WLEuDFhOMxNDNi',
    liquidsMessage: 'Какие жидкости тебя интересуют?',
    chatMessage: 'Ты хочешь узнать больше о жидкостях или просто пообщаться? Тогда заходи в наш телеграмм чат - https://t.me/+guNR5ZSoLOgzMGE0',
    hotspot: `Вкусы:  
    1. Брусника лимон (2 банки);  
    2. Свежая мята (2 банки); 
    3. Кислые лесные ягоды (2 банки); 
    4. Ананас кокос (2 банки); 
    5. Жвачка с вишней и льдом (2 банки); 
    за покупкой писать: 
    @wevewrweyw  
    @hotspot_poland`,
    podonki: `Нет в наличии ❌ 
    за покупкой писать: 
    @wevewrweyw  
    @hotspot_poland`,
    sk360: `Вкусы:  
    1. Пина колада (2 банки);  
    2. Персик цитрус (2 банки); 
    3. Розовый лимонад (2 банки); 
    4. Клубника лайм (2 банки); 
    5. Смородина черная (2 банки) 
    за покупкой писать: 
    @wevewrweyw  
    @hotspot_poland`,
    skai: `Вкусы:  
    1. Цитрус барбарис (2 банки);  
    2. Тропический йогурт (2 банки); 
    3. Грейпфрут лесные ягоды (2 банки); 
    4. Клубника киви (2 банки); 
    5. Клубничное мороженое( 2 банки); 
    за покупкой писать:  
    @wevewrweyw  
    @hotspot_poland`,
}

const languagePl = {
    welcomeMessage: "Czesc! Najpierw wybierz język - /language ",
    infoMessage: 'Zajmujemy się sprzedażą płynu wysokiej jakości HOT SPOT oraz innych liquidów na terenie Białegostoku. Pracujemy już około pół roku i każdego dnia zachwycamy naszych klientów wysoką jakością liquidu. Jeśli jesteś zainteresowany zakupem, wpisz komendę /liquids, a zostaniesz przeniesiony do kategorii liqidów',
    reviewMessage: 'Recenzje są już dostępne, jeśli chcesz napisać recenzję lub obejrzeć, wejdź na - https://t.me/+11WLEuDFhOMxNDNi',
    liquidsMessage: 'Jakie liquidy cię interesują?',
    chatMessage: 'Chcesz dowiedzieć się więcej o płynach lub po prostu porozmawiać? To zapraszam na nasz czat - https://t.me/+guNR5ZSoLOgzMGE0',
    hotspot: `Smaki: 
    1. Cytryna borówka (2 butelki); 
    2. Świeża mięta (2 butelki); 
    3. Kwaśne dzikie jagody (2 butelki); 
    4. Kokos ananas (2 butelki); 
    5. Guma z wiśnią i lodem (2 butelki); 
    w sprawie zakupu pisz: 
    @wevewrweyw  
    @hotspot_poland`,
    podonki: `Brak w magazynie ❌ 
    w sprawie zakupu pisz: 
    @wevewrweyw 
    @hotspot_poland`,
    sk360: `Smaki: 
    1. Pinacolada (2 butelki); 
    2. Cytrusy brzoskwinia (2 butelki); 
    3. Różowa lemoniada (2 butelki); 
    4. Limonka truskawka (2 butelki); 
    5. Czarna porzeczka (2 butelki) 
    w sprawie zakupu pisz: 
    @wevewrweyw 
    @hotspot_poland`,
    skai: `Smaki: 
    1. Berberys cytrus (2 butelki); 
    2. Jogurt tropikalny (2 butelki); 
    3. Dzikie jagody grejpfrutowe (2 butelki); 
    4. Truskawka kiwi (2 butelki); 
    5. Lody truskawkowe (2 butelki); 
    w sprawie zakupu napisz: 
    @wevewrweyw  
    @hotspot_poland`,
}

const languageButtons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Русский', callback_data: 'ru' }],
            [{ text: 'Polski', callback_data: 'pl' }]
        ]
    })
}

const liquidsButtons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: "HOTSPOT", callback_data: '1' }],
            [{ text: "PODONKI", callback_data: '2' }],
            [{ text: "SK-360", callback_data: '3' }],
            [{ text: "SK.AI", callback_data: '4' }],
        ],
    }),
};

const languages = {
    ru: languageRu,
    pl: languagePl,
};

const userLanguages = {};

bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "ru" || data === "pl") {
        userLanguages[chatId] = data;
        await bot.sendMessage(chatId, "Выбран язык: " + data);
    }
});

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    const selectedLanguage = userLanguages[chatId] || 'ru';

    const language = languages[selectedLanguage];

    switch (text) {
        case '/start':
            await bot.sendMessage(chatId, language.welcomeMessage);
            break;
        case '/info':
            await bot.sendMessage(chatId, language.infoMessage);
            break;
        case '/liquids':
            await bot.sendMessage(chatId, language.liquidsMessage, liquidsButtons);
            break;
        case '/reviews':
            await bot.sendMessage(chatId, language.reviewMessage);
            break;
        case '/chat':
            await bot.sendMessage(chatId, language.chatMessage);
            break;
        case '/language':
            await bot.sendMessage(chatId, "Выберите язык", languageButtons);
            break;
        default:
            await bot.sendMessage(chatId, "Непонятная команда. Выберите команду из меню.");
            break;
    }
});

bot.on('callback_query', async msg => {
    const data = msg.data
    const chatId = msg.message.chat.id

    const selectedLanguage = userLanguages[chatId] || 'ru';

    const language = languages[selectedLanguage];

    if(data === "1") {
        await bot.sendPhoto(chatId, 'https://file.wikkeo.com/assets/images/products/FVOdsyPl8adZ.jpg')
        await bot.sendMessage(chatId, language.hotspot, liquidsButtons)
    }
    if(data === "2") {
        await bot.sendPhoto(chatId, 'https://irecommend.ru/sites/default/files/product-images/2642389/EXTMk0tRyziB5jJUrEaDlg.jpg')
        await bot.sendMessage(chatId, language.podonki, liquidsButtons)
    }
    if(data === "3") {
        await bot.sendPhoto(chatId, 'https://vaperist.ru/d/s-k360_salt.png')
        await bot.sendMessage(chatId, language.sk360, liquidsButtons)
    }
    if(data === "4") {
        await bot.sendPhoto(chatId, 'https://ltdfoto.ru/images/2023/09/17/Screenshot_6.png')
        await bot.sendMessage(chatId, language.skai, liquidsButtons)
    }
})