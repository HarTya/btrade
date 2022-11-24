require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api')

const bot = new TelegramApi(process.env.TOKEN, { polling: true })

const startMessageOptions = {
    parse_mode: 'Markdown', reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '💸 Канал + Сигналы - 10$ / Скидка: 50%', callback_data: '1' }],
            [{ text: '🤝 VIP Тариф - 30$', callback_data: '2' }],
            [{ text: '👑 Личное Ведение - 50$', callback_data: '3' }]
        ]
    })
}

function buttonMessageOptions(callback_query_data) {
    if (callback_query_data === 1) {
        return {
            parse_mode: 'Markdown', reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'Приобрести 💸 Канал + Сигналы 💸', url: `https://t.me/${process.env.ADMIN_USERNAME}` }]
                ]
            })
        }
    } else if (callback_query_data === 2) {
        return {
            parse_mode: 'Markdown', reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'Приобрести 🤝 VIP Тариф 🤝', url: `https://t.me/${process.env.ADMIN_USERNAME}` }]
                ]
            })
        }
    } else if (callback_query_data === 3) {
        return {
            parse_mode: 'Markdown', reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'Приобрести 👑 Личное Ведение 👑', url: `https://t.me/${process.env.ADMIN_USERNAME}` }]
                ]
            })
        }
    }
}

async function sendMessage(chatId, text, user) {
    try {
        if (String(text).includes('/start')) {
            return bot.sendMessage(chatId, `*🖐 Здравствуйте, ${user}!\n\nЕсли Вы сюда зашли, значит хотите вырваться из системы и начать зарабатывать кэш 🤑*\n\n_💼 В нашем Закрытом Телеграм Канале мы даем сигналы по трейдингу криптовалют на самых популярных биржах и предоставляем обучение для новичков. Наши сигналы подходят как начинающим, так и опытным трейдерам._\n\n*Выберите подходящий Вам тариф и погнали 🚀*`,
                startMessageOptions
            )
        }
    } catch (err) {
        return bot.sendMessage(chatId, `Упс... произошла ошибка`)
    }
}

bot.on('message', async msg => {
    const chatId = msg.chat.id
    const text = msg.text
    let user = msg.chat.first_name || msg.chat.username

    sendMessage(chatId, text, user)
})

async function sendButtonMessage(chatId, data) {
    try {
        if (data === '1') {
            return bot.sendMessage(chatId, '*💸 Канал + Сигналы 💸*\n\nЗа *10$* Вы получаете:\n\n_✅ Доступ к 🔒_*Закрытому Телеграм Каналу*_\nВ котором публикуются Актуальные Сигналы, Новости, Подсказки и т.д_\n\nДля того чтобы получить доступ к *Каналу*\nНажмите на кнопку ниже ⬇️ и напишите\n*— "Канал"*',
                buttonMessageOptions(1)
            )
        } else if (data === '2') {
            return bot.sendMessage(chatId, '*🤝 VIP Тариф 🤝*\n\nЗа *30$* Вы получаете:\n\n_✅ Доступ к 🔒_*Закрытому Телеграм Каналу*_\nВ котором публикуются Актуальные Сигналы, Новости, Подсказки и т.д_\n\n_✅ А также: эксклюзивно для тех кто приобрел _*VIP*_,\nнаша команда видя оптимальную точку входа для торговли, сразу же дает индивидуальные рекомендации,\n_*консультирует*_ на протяжении всей сделки._\n\n*VIP - Это Оптимальный вариант получать крутой профит ежедневно*\n\nДля того чтобы получить доступ к *VIP*\nНажмите на кнопку ниже ⬇️ и напишите\n*— "VIP"*',
                buttonMessageOptions(2)
            )
        } else if (data === '3') {
            return bot.sendMessage(chatId, '*👑 Личное Ведение 👑*\n\nЗа *50$* Вы получаете:\n\n_✅ Доступ к 🔒_*Закрытому Телеграм Каналу*_\nВ котором публикуются Актуальные Сигналы, Новости, Подсказки и т.д_\n\n_✅ Индивидуальные Рекомендации_\n\n_✅ Если Вы только знакомитесь с торговлей на Крипто биржах, то для тех кто приобрел _*Личное Ведение*_ один из наших Специалистов введет Вас в курс дела, познакомит с азами, и будет 🧍_*Вашим Наставником*\n\n_🔥 А так же, тем кто приобрел _*Личное Ведение*_ мы расскажем секретные способы, благодаря которым можно закрывать 📈_*Самые Профитные Сделки*\n\nДля того чтобы получить доступ к *Личному Ведению*\nНажмите на кнопку ниже ⬇️ и напишите\n*— "Личное Ведение"*',
                buttonMessageOptions(3)
            )
        }
    } catch (err) {
        return bot.sendMessage(chatId, `Упс... произошла ошибка`)
    }
}

bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id
    const data = msg.data

    sendButtonMessage(chatId, data)
})