#!/usr/bin/env node
// var args = process.argv.slice(2)

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello , I am a chat bot')
})


app.get('/sendmessage', function (req, res) {
    var token = "EAAG41f0vuGYBAJHI9KcXyqBrvOKvQbYabohleKABAZBlC9bsB6ZCZAnY9T5eRI3ZBwroRO6N92xXVkaZCe7ylmjlttgHIHFZAlZBzKDLoy295ES2ofPzY1BwODZCdhJ0hhaS03HuZA0VUgZBhkSfJaqRmOvZAnS54hlSvAW4eSC2bfq9wZDZD"

})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    console.log('web hook get')
    if (req.query['hub.verify_token'] === 'Aha_Moment_Labs') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'))
})


// API End Point - added by Stefan

app.post('/webhook/', function (req, res) {
//     console.log(req)
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        console.log('sender id')
        console.log(sender)
        if (event.message && event.message.text) {
            text = event.message.text
            if (text === 'hi') {
                sendGenericMessage(sender)
                continue
            }
            if (text === "Trời mưa") {
                sendTextMessage(sender, "Bạn nhớ mặc áo mưa vào nhé")
            }
            if (text === "Tôi không có áo mưa") {
                sendTextMessage(sender, "Bạn có thể ghé vào một cửa hàng tạp hoá gần nhất")
            }
            if (text === "Nhưng mưa to quá") {
                sendTextMessage(sender, "Bạn đợi tạnh mưa rồi về nhé")
            }
            if (text === "hello") {
                sendTextMessageCustom(sender)
                continue
            }
            sendTextMessage(sender, "parrot: " + text.substring(0, 200) + "\n" + sender)
        }
        if (event.postback) {
            text = JSON.stringify(event.postback)
            sendTextMessage(sender, "Postback received: " + text.substring(0, 200), token)
            continue
        }
    }
    res.sendStatus(200)
})


// var token = "EAAYxQDnmq74BACAQ4HIvckVQrG4ZAueKXsZCDpKH7oB4kPaS7IalUnRogUUTICP8OFh112QlKjKQEqEwB30GFYKOEKrHMCePwJwJdmxXR4l8DFQ9P4M9F8lI66orLMlH5JAPGOSKth6NH4rWrhmGdR8ZBOZBtKLFWiH843rL6wZDZD"
var token = "EAAG41f0vuGYBAG3qZAxB2TV0BJbRByrxWoZAQBiKFZCI9b3biEJXXnebyfuxeZCGLhzyZCkQKQmFTYIJYTkd6ebThqjH9ufAylA2BuagI6g0uIRwYw7XzbbGMxZCWJj3neG2uXgo3rAnY2wyQp3JIEiNRpzZBya1Ywu0kXaDWZBEiQZDZD"


// function to echo back messages - added by Stefan

function sendTextMessage(sender, text) {
    messageData = {
        text: text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
    // continue
}

// function to echo back messages - added by Nguyen Huu Thanh

function sendTextMessageCustom(sender, text) {
    messageData = {
        text: 'Chào bạn tùng đẹp troai, chúng tôi có thể giúp gì cho bạn'
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


// Send an test message back as two cards.

function sendGenericMessage(sender) {
    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Ai Chat Bot Communities",
                    "subtitle": "Communities to Follow",
                    "image_url": "http://1u88jj3r4db2x4txp44yqfj1.wpengine.netdna-cdn.com/wp-content/uploads/2016/04/chatbot-930x659.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.facebook.com/abitplus/",
                        "title": "FB Abit Plus"
                    }, {
                        "type": "web_url",
                        "url": "https://www.reddit.com/r/Chat_Bots/",
                        "title": "Chatbots on Abit Group"
                    }, {
                        "type": "web_url",
                        "url": "https://www.facebook.com/shopmemuavn/",
                        "title": "Chatbots Của Shop Me Mua"
                    }],
                }, {
                    "title": "Chatbots FAQ",
                    "subtitle": "Aking the Deep Questions",
                    "image_url": "https://tctechcrunch2011.files.wordpress.com/2016/04/facebook-chatbots.png?w=738",
                    "buttons": [{
                        "type": "postback",
                        "title": "What's the benefit?",
                        "payload": "Chatbots make content interactive instead of static",
                    }, {
                        "type": "postback",
                        "title": "What can Chatbots do",
                        "payload": "One day Chatbots will control the Internet of Things! You will be able to control your homes temperature with a text",
                    }, {
                        "type": "postback",
                        "title": "The Future",
                        "payload": "Chatbots are fun! One day your BFF might be a Chatbot",
                    }],
                }, {
                    "title": "Learning More",
                    "subtitle": "Aking the Deep Questions",
                    "image_url": "http://www.brandknewmag.com/wp-content/uploads/2015/12/cortana.jpg",
                    "buttons": [{
                        "type": "postback",
                        "title": "AIML",
                        "payload": "Checkout Artificial Intelligence Mark Up Language. Its easier than you think!",
                    }, {
                        "type": "postback",
                        "title": "Machine Learning",
                        "payload": "Use python to teach your maching in 16D space in 15min",
                    }, {
                        "type": "postback",
                        "title": "Communities",
                        "payload": "Online communities & Meetups are the best way to stay ahead of the curve!",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

