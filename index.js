const TelegramApi = require('node-telegram-bot-api')

const token = '6328011279:AAE3qpCyJjxbZiHGmlRdHW6wxddVmrwACl0'

const bot = new TelegramApi(token, {polling: true})

bot.setMyCommands([
    {command: '/start', description: 'Старт'},
    {command: '/info', description: 'Информация'},
    {command: '/liquids', description: 'Жидкость'},
    {command: '/reviews', description: 'Отзывы'},
    {command: '/chat', description: 'Чат'},
])

// const commands = {
//     reply_markup: JSON.stringify({
//         inline_keyboard: [
//             [{text: "/start", callback_data: '11'}],
//             [{text: "/info", callback_data: '22'}],
//             [{text: "/liquids", callback_data: '33'}],
//         ]
//     })
// }

const liquidsButtons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "HOTSPOT", callback_data: '1'}],
            [{text: "PODONKI", callback_data: '2'}],
            [{text: "SK-360", callback_data: '3'}],
            [{text: "SK.AI", callback_data: '4'}],
        ]
    })
}

bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === '/start') {
        await bot.sendMessage(chatId, "Добро пожаловать! Чем я могу помочь?")
    }
    if (text === '/info') {
        await bot.sendMessage(chatId, 'Мы занимаемся продажей оригинальной жидкости HOT SPOT и других жидкостей в Белостоке. Работаем уже как полгода, и с каждым днем, радуем наших клиентов высоким качеством жидкости. Если вы заинтересовались в покупке жидкости, то пропишите команду /liquids и вы попадете в категорию жидкостей!')
    }
    if (text === '/liquids') {
        await bot.sendMessage(chatId, 'Какие жидкости тебя интересуют?', liquidsButtons)
    }
    if (text === '/reviews') {
        await bot.sendMessage(chatId, 'Отзывы уже доступны, если вы хотите написать отзыв или посмотреть переходи - https://t.me/+11WLEuDFhOMxNDNi')
    }
    if (text === '/chat') {
        await bot.sendMessage(chatId, 'Ты хочешь узнать больше о жидкостях или просто пообщаться? Тогда заходи в наш телеграмм чат - https://t.me/+guNR5ZSoLOgzMGE0')
    }
})

bot.on('callback_query', async msg => {
    const data = msg.data
    const chatId = msg.message.chat.id

    if(data === "1") {
        await bot.sendPhoto(chatId, 'https://file.wikkeo.com/assets/images/products/FVOdsyPl8adZ.jpg')
        await bot.sendMessage(chatId, `Вкусы: 
1. Брусника лимон (2 банки); 
2. Свежая мята (2 банки);
3. Кислые лесные ягоды (2 банки);
4. Ананас кокос (2 банки);
5. Жвачка с вишней и льдом (2 банки);
за покупкой писать:
@wevewrweyw 
@hotspot_poland`, liquidsButtons)
    }
    if(data === "2") {
        await bot.sendPhoto(chatId, 'https://irecommend.ru/sites/default/files/product-images/2642389/EXTMk0tRyziB5jJUrEaDlg.jpg')
        await bot.sendMessage(chatId, `Нет в наличии ❌
за покупкой писать:
@wevewrweyw 
@hotspot_poland`, liquidsButtons)
    }
    if(data === "3") {
        await bot.sendPhoto(chatId, 'https://vaperist.ru/d/s-k360_salt.png')
        await bot.sendMessage(chatId, `Вкусы: 
1. Пина колада (2 банки); 
2. Персик цитрус (2 банки);
3. Розовый лимонад (2 банки);
4. Клубника лайм (2 банки);
5. Смородина черная (2 банки)
за покупкой писать:
@wevewrweyw 
@hotspot_poland`, liquidsButtons)
    }
    if(data === "4") {
        await bot.sendPhoto(chatId, 'https://ltdfoto.ru/images/2023/09/17/Screenshot_6.png')
        await bot.sendMessage(chatId, `Вкусы: 
1. Цитрус барбарис (2 банки); 
2. Тропический йогурт (2 банки);
3. Грейпфрут лесные ягоды (2 банки);
4. Клубника киви (2 банки);
5. Клубничное мороженое( 2 банки);
за покупкой писать: 
@wevewrweyw 
@hotspot_poland`, liquidsButtons)
    }
})
