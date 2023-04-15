<template>
  <q-page class='flex flex-center'>
    <!-- <img
      alt='Quasar logo'
      src='~assets/quasar-logo-vertical.svg'
      style='width: 200px; height: 200px'
    > -->
    <div>
      <vue-advanced-chat
        height='calc(100vh - 20px)'
        :current-user-id='currentUserId'
        :rooms='JSON.stringify(rooms)'
        :rooms-loaded='true'
        :messages='JSON.stringify(messages)'
        :message-actions='JSON.stringify(messageActions)'
        :message-selection-actions='JSON.stringify(messageSelectActions)'
        :messages-loaded='messagesLoaded'
        @send-message='sendMessage($event.detail[0])'
        @edit-message='editMessage($event.detail[0])'
        @delete-message='deleteMessages($event.detail[0])'
        @fetch-messages='fetchMessages($event.detail[0])'
        @message-selection-action-handler="messageSelectionActionHandler($event.detail[0])"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { register } from 'vue-advanced-chat'
register()

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      currentUserId: '4',
      rooms: [
        {
          roomId: '1',
          roomName: 'Rook Skywalker',
          avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
          users: [
            {
              _id: '1',
              username: 'Rook Skywalker',
              avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
              status: {
                state: 'online',
                lastChanged: '14 July, 20:00'
              }
            },
            {
              _id: '4',
              username: 'Yoda',
              avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
              status: {
                state: 'online',
                lastChanged: 'today, 14:30'
              }
            }
          ]
        },
        {
          roomId: '2',
          roomName: 'ほげほげるーむ',
          avatar: 'https://api2.teraiku.jp/storage/img/avatar/avatar-1674474526-Kimi_Onoda.jpeg',
          users: [
            {
              _id: '2',
              username: '小野田紀美',
              avatar: 'https://api2.teraiku.jp/storage/img/avatar/avatar-1674474526-Kimi_Onoda.jpeg',
              status: {
                state: 'offline',
                lastChanged: '14 July, 20:00'
              }
            },
            {
              _id: '4',
              username: 'Yoda',
              avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
              status: {
                state: 'online',
                lastChanged: 'today, 14:30'
              }
            }
          ]
        },
        {
          roomId: '3',
          roomName: 'フガフガるーむ',
          avatar: 'https://api2.teraiku.jp/storage/img/avatar/avatar-1674400701-undefined',
          users: [
            {
              _id: '3',
              username: '岸田文雄',
              avatar: 'https://api2.teraiku.jp/storage/img/avatar/avatar-1674400701-undefined',
              status: {
                state: 'offline',
                lastChanged: '14 July, 20:00'
              }
            },
            {
              _id: '4',
              username: 'Yoda',
              avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
              status: {
                state: 'online',
                lastChanged: 'today, 14:30'
              }
            }
          ]
        }
      ],
      messages: [],
      messagesLoaded: false,
      messageActions: [
        {
          name: 'replyMessage',
          title: 'Reply'
        },
        {
          name: 'editMessage',
          title: 'Edit Message',
          onlyMe: true
        },
        {
          name: 'deleteMessage',
          title: 'Delete Message',
          onlyMe: true
        },
        {
          name: 'selectMessages',
          title: 'Select'
        }
      ],
      messageSelectActions: [
        {
          name: 'deleteMessages',
          title: 'Delete'
        }
        // {
        //   name: 'shareMessage',
        //   title: 'Share'
        // }
      ]
    }
  },

  methods: {
    fetchMessages ({ room, options = {} }) {
      console.log(options)
      console.log(room)
      setTimeout(() => {
        if (options.reset) {
          console.log('true')
          this.messages = this.addMessages(room.roomId, this.messages.length)
          this.messagesLoaded = true
        } else {
          console.log('false')
          this.messages = [...this.addMessages(room.roomId, this.messages.length), ...this.messages]
          this.messagesLoaded = true
        }
      })
      console.log(this.messages)
      console.log(this.messagesLoaded)
    },
    addMessages (roomId, messageLength) {
      const messages = []
      console.log(roomId)

      messages.push({
        _id: messageLength,
        content: 'めっせーじ',
        senderId: '4',
        avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
        username: 'Yoda',
        date: '12 November',
        timestamp: '9:20'
      })

      if (roomId === '1') {
        for (let i = 0; i < 2; i++) {
          messages.push({
            _id: i + 1 + messageLength,
            content: `message ${i + 1}`,
            senderId: '1',
            avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
            username: 'Rook Skywalker',
            date: '14 November',
            timestamp: '10:20',
            seen: true
          })
        }
      }

      if (roomId === '2') {
        for (let i = 0; i < 2; i++) {
          messages.push({
            _id: i + 1 + messageLength,
            content: `message ${i + 1}`,
            senderId: '2',
            avatar: 'https://api2.teraiku.jp/storage/img/avatar/avatar-1674474526-Kimi_Onoda.jpeg',
            username: '小野田紀美',
            date: '15 November',
            timestamp: '10:20',
            seen: true
          })
        }
      }

      if (roomId === '3') {
        for (let i = 0; i < 2; i++) {
          messages.push({
            _id: i + 1 + messageLength,
            content: `message ${i + 1}`,
            senderId: '3',
            avatar: 'https://api2.teraiku.jp/storage/img/avatar/avatar-1674400701-undefined',
            username: '岸田文雄',
            date: '16 November',
            timestamp: '11:20',
            seen: true
          })
        }
      }
      console.log(messages)
      return messages
    },
    sendMessage ({ roomId, content, files, replyMessage, usersTag }) {
      let kindofMessages = ''
      console.log(kindofMessages)
      const reader = new FileReader()
      if (files) {
        reader.readAsDataURL(files[0].blob)
        if (content) {
          kindofMessages = 'sendBoth'
        } else {
          kindofMessages = 'sendFiles'
        }
      } else {
        kindofMessages = 'sendContent'
      }
      console.log(kindofMessages)
      console.log(roomId)
      console.log(content)
      console.log(files)
      console.log(replyMessage)
      console.log(usersTag)
      reader.onloadend = () => {
        const base64String = reader.result
        if (replyMessage) {
          switch (kindofMessages) {
            case 'sendBoth':
              this.messages = [
                ...this.messages,
                {
                  _id: this.messages.length,
                  content,
                  senderId: this.currentUserId,
                  avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                  username: 'John Show',
                  timestamp: new Date().toString().substring(16, 21),
                  date: new Date().toDateString(),
                  seen: false,
                  failure: true,
                  files: [
                    {
                      name: files.name,
                      size: files.size,
                      type: files.type,
                      audio: true,
                      duration: 14.4,
                      url: files.localUrl,
                      preview: base64String
                    }
                  ],
                  replyMessage: {
                    content: replyMessage.content,
                    senderId: replyMessage.senderId,
                    avatar: replyMessage.avatar,
                    username: replyMessage.username,
                    timestamp: replyMessage.timestamp,
                    date: replyMessage.date
                  }
                }
              ]
              break
            case 'sendFiles':
              this.messages = [
                ...this.messages,
                {
                  _id: this.messages.length,
                  content,
                  senderId: this.currentUserId,
                  avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                  username: 'John Show',
                  timestamp: new Date().toString().substring(16, 21),
                  date: new Date().toDateString(),
                  seen: false,
                  failure: true,
                  files: [
                    {
                      name: files.name,
                      size: files.size,
                      type: files.type,
                      audio: true,
                      duration: 14.4,
                      url: files.localUrl,
                      preview: base64String
                    }
                  ],
                  replyMessage: {
                    content: replyMessage.content,
                    senderId: replyMessage.senderId,
                    avatar: replyMessage.avatar,
                    username: replyMessage.username,
                    timestamp: replyMessage.timestamp,
                    date: replyMessage.date
                  }
                }
              ]
              break
            case 'sendContent':
              this.messages = [
                ...this.messages,
                {
                  _id: this.messages.length,
                  content,
                  senderId: this.currentUserId,
                  avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                  username: 'John Show',
                  timestamp: new Date().toString().substring(16, 21),
                  date: new Date().toDateString(),
                  seen: false,
                  replyMessage: {
                    content: replyMessage.content,
                    senderId: replyMessage.senderId,
                    avatar: replyMessage.avatar,
                    username: replyMessage.username,
                    timestamp: replyMessage.timestamp,
                    date: replyMessage.date
                  }
                }
              ]
              break
          }
        } else {
          switch (kindofMessages) {
            case 'sendBoth':
              this.messages = [
                ...this.messages,
                {
                  _id: this.messages.length,
                  content,
                  senderId: this.currentUserId,
                  avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                  username: 'John Show',
                  timestamp: new Date().toString().substring(16, 21),
                  date: new Date().toDateString(),
                  seen: false,
                  failure: true,
                  files: [
                    {
                      name: files[0].name,
                      size: files[0].size,
                      type: files[0].type,
                      audio: true,
                      duration: 14.4,
                      url: files[0].localUrl,
                      preview: base64String
                    }
                  ]
                }
              ]
              break
            case 'sendFiles':
              this.messages = [
                ...this.messages,
                {
                  _id: this.messages.length,
                  content,
                  senderId: this.currentUserId,
                  avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                  username: 'John Show',
                  timestamp: new Date().toString().substring(16, 21),
                  date: new Date().toDateString(),
                  seen: false,
                  failure: true,
                  files: [
                    {
                      name: files[0].name,
                      size: files[0].size,
                      type: files[0].type,
                      audio: true,
                      duration: 14.4,
                      url: files[0].localUrl,
                      preview: base64String
                    }
                  ]
                }
              ]
              break
            case 'sendContent':
              this.messages = [
                ...this.messages,
                {
                  _id: this.messages.length,
                  content,
                  senderId: this.currentUserId,
                  avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                  username: 'John Show',
                  timestamp: new Date().toString().substring(16, 21),
                  date: new Date().toDateString(),
                  seen: false
                }
              ]
              break
          }
        }
        console.log(this.messages)
      }
      if (replyMessage) {
        switch (kindofMessages) {
          case 'sendBoth':
            this.messages = [
              ...this.messages,
              {
                _id: this.messages.length,
                content,
                senderId: this.currentUserId,
                avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                username: 'John Show',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                seen: false,
                failure: true,
                files: [
                  {
                    name: files.name,
                    size: files.size,
                    type: files.type,
                    audio: true,
                    duration: 14.4,
                    url: files.localUrl
                  }
                ],
                replyMessage: {
                  content: replyMessage.content,
                  senderId: replyMessage.senderId,
                  avatar: replyMessage.avatar,
                  username: replyMessage.username,
                  timestamp: replyMessage.timestamp,
                  date: replyMessage.date
                }
              }
            ]
            break
          case 'sendFiles':
            this.messages = [
              ...this.messages,
              {
                _id: this.messages.length,
                content,
                senderId: this.currentUserId,
                avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                username: 'John Show',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                seen: false,
                failure: true,
                files: [
                  {
                    name: files.name,
                    size: files.size,
                    type: files.type,
                    audio: true,
                    duration: 14.4,
                    url: files.localUrl
                  }
                ],
                replyMessage: {
                  content: replyMessage.content,
                  senderId: replyMessage.senderId,
                  avatar: replyMessage.avatar,
                  username: replyMessage.username,
                  timestamp: replyMessage.timestamp,
                  date: replyMessage.date
                }
              }
            ]
            break
          case 'sendContent':
            this.messages = [
              ...this.messages,
              {
                _id: this.messages.length,
                content,
                senderId: this.currentUserId,
                avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                username: 'John Show',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                seen: false,
                failure: true,
                replyMessage: {
                  content: replyMessage.content,
                  senderId: replyMessage.senderId,
                  avatar: replyMessage.avatar,
                  username: replyMessage.username,
                  timestamp: replyMessage.timestamp,
                  date: replyMessage.date
                }
              }
            ]
            break
        }
      } else {
        switch (kindofMessages) {
          case 'sendBoth':
            this.messages = [
              ...this.messages,
              {
                _id: this.messages.length,
                content,
                senderId: this.currentUserId,
                avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                username: 'John Show',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                seen: false,
                failure: true,
                files: [
                  {
                    name: files[0].name,
                    size: files[0].size,
                    type: files[0].type,
                    audio: true,
                    duration: 14.4,
                    url: files[0].localUrl
                  }
                ]
              }
            ]
            break
          case 'sendFiles':
            this.messages = [
              ...this.messages,
              {
                _id: this.messages.length,
                content,
                senderId: this.currentUserId,
                avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                username: 'John Show',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                seen: false,
                failure: true,
                files: [
                  {
                    name: files[0].name,
                    size: files[0].size,
                    type: files[0].type,
                    audio: true,
                    duration: 14.4,
                    url: files[0].localUrl
                  }
                ]
              }
            ]
            break
          case 'sendContent':
            this.messages = [
              ...this.messages,
              {
                _id: this.messages.length,
                content,
                senderId: this.currentUserId,
                avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                username: 'John Show',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                seen: false
              }
            ]
            break
        }
      }
      console.log(this.messages)
    },
    editMessage ({ roomId, messageId, newContent, files, replyMessage, usersTag }) {
      let kindofMessages = ''
      console.log(kindofMessages)
      const reader = new FileReader()
      if (files) {
        reader.readAsDataURL(files[0].blob)
        if (newContent) {
          kindofMessages = 'sendBoth'
        } else {
          kindofMessages = 'sendFiles'
        }
      } else {
        kindofMessages = 'sendContent'
      }
      console.log(kindofMessages)
      console.log(roomId)
      console.log(messageId)
      console.log(newContent)
      console.log(files)
      console.log(replyMessage)
      console.log(usersTag)
      reader.onloadend = () => {
        const base64String = reader.result
        if (replyMessage) {
          switch (kindofMessages) {
            case 'sendBoth':
              this.messages[messageId] = {
                _id: messageId,
                content: newContent,
                senderId: this.currentUserId,
                avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                username: 'John Show',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                saved: true,
                seen: false,
                failure: true,
                files: [
                  {
                    name: files.name,
                    size: files.size,
                    type: files.type,
                    audio: true,
                    duration: 14.4,
                    url: files.localUrl,
                    preview: base64String
                  }
                ],
                replyMessage: {
                  content: replyMessage.content,
                  senderId: replyMessage.senderId,
                  avatar: replyMessage.avatar,
                  username: replyMessage.username,
                  timestamp: replyMessage.timestamp,
                  date: replyMessage.date
                }
              }
              break
            case 'sendFiles':
              this.messages[messageId] = {
                _id: messageId,
                content: newContent,
                senderId: this.currentUserId,
                avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                username: 'John Show',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                saved: true,
                seen: false,
                failure: true,
                files: [
                  {
                    name: files.name,
                    size: files.size,
                    type: files.type,
                    audio: true,
                    duration: 14.4,
                    url: files.localUrl,
                    preview: base64String
                  }
                ],
                replyMessage: {
                  content: replyMessage.content,
                  senderId: replyMessage.senderId,
                  avatar: replyMessage.avatar,
                  username: replyMessage.username,
                  timestamp: replyMessage.timestamp,
                  date: replyMessage.date
                }
              }
              break
            case 'sendContent':
              this.messages[messageId] = {
                _id: messageId,
                content: newContent,
                senderId: this.currentUserId,
                avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                username: 'John Show',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                saved: true,
                seen: false,
                replyMessage: {
                  content: replyMessage.content,
                  senderId: replyMessage.senderId,
                  avatar: replyMessage.avatar,
                  username: replyMessage.username,
                  timestamp: replyMessage.timestamp,
                  date: replyMessage.date
                }
              }
              break
          }
        } else {
          switch (kindofMessages) {
            case 'sendBoth':
              this.messages[messageId] = {
                _id: messageId,
                content: newContent,
                senderId: this.currentUserId,
                avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                username: 'John Show',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                saved: true,
                seen: false,
                failure: true,
                files: [
                  {
                    name: files[0].name,
                    size: files[0].size,
                    type: files[0].type,
                    audio: true,
                    duration: 14.4,
                    url: files[0].localUrl,
                    preview: base64String
                  }
                ]
              }
              break
            case 'sendFiles':
              this.messages[messageId] = {
                _id: messageId,
                content: newContent,
                senderId: this.currentUserId,
                avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                username: 'John Show',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                saved: true,
                seen: false,
                failure: true,
                files: [
                  {
                    name: files[0].name,
                    size: files[0].size,
                    type: files[0].type,
                    audio: true,
                    duration: 14.4,
                    url: files[0].localUrl,
                    preview: base64String
                  }
                ]
              }
              break
            case 'sendContent':
              this.messages[messageId] = {
                _id: messageId,
                content: newContent,
                senderId: this.currentUserId,
                avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
                username: 'John Show',
                timestamp: new Date().toString().substring(16, 21),
                date: new Date().toDateString(),
                saved: true,
                seen: false
              }
              break
          }
        }
        console.log(this.messages)
      }
      if (replyMessage) {
        switch (kindofMessages) {
          case 'sendBoth':
            this.messages[messageId] = {
              _id: messageId,
              content: newContent,
              senderId: this.currentUserId,
              avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
              username: 'John Show',
              timestamp: new Date().toString().substring(16, 21),
              date: new Date().toDateString(),
              saved: true,
              seen: false,
              failure: true,
              files: [
                {
                  name: files.name,
                  size: files.size,
                  type: files.type,
                  audio: true,
                  duration: 14.4,
                  url: files.localUrl
                }
              ],
              replyMessage: {
                content: replyMessage.content,
                senderId: replyMessage.senderId,
                avatar: replyMessage.avatar,
                username: replyMessage.username,
                timestamp: replyMessage.timestamp,
                date: replyMessage.date
              }
            }
            break
          case 'sendFiles':
            this.messages[messageId] = {
              _id: messageId,
              content: newContent,
              senderId: this.currentUserId,
              avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
              username: 'John Show',
              timestamp: new Date().toString().substring(16, 21),
              date: new Date().toDateString(),
              saved: true,
              seen: false,
              failure: true,
              files: [
                {
                  name: files.name,
                  size: files.size,
                  type: files.type,
                  audio: true,
                  duration: 14.4,
                  url: files.localUrl
                }
              ],
              replyMessage: {
                content: replyMessage.content,
                senderId: replyMessage.senderId,
                avatar: replyMessage.avatar,
                username: replyMessage.username,
                timestamp: replyMessage.timestamp,
                date: replyMessage.date
              }
            }
            break
          case 'sendContent':
            this.messages[messageId] = {
              _id: messageId,
              content: newContent,
              senderId: this.currentUserId,
              avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
              username: 'John Show',
              timestamp: new Date().toString().substring(16, 21),
              date: new Date().toDateString(),
              saved: true,
              seen: false,
              replyMessage: {
                content: replyMessage.content,
                senderId: replyMessage.senderId,
                avatar: replyMessage.avatar,
                username: replyMessage.username,
                timestamp: replyMessage.timestamp,
                date: replyMessage.date
              }
            }
            break
        }
      } else {
        switch (kindofMessages) {
          case 'sendBoth':
            this.messages[messageId] = {
              _id: messageId,
              content: newContent,
              senderId: this.currentUserId,
              avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
              username: 'John Show',
              timestamp: new Date().toString().substring(16, 21),
              date: new Date().toDateString(),
              saved: true,
              seen: false,
              failure: true,
              files: [
                {
                  name: files[0].name,
                  size: files[0].size,
                  type: files[0].type,
                  audio: true,
                  duration: 14.4,
                  url: files[0].localUrl
                }
              ]
            }
            break
          case 'sendFiles':
            this.messages[messageId] = {
              _id: messageId,
              content: newContent,
              senderId: this.currentUserId,
              avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
              username: 'John Show',
              timestamp: new Date().toString().substring(16, 21),
              date: new Date().toDateString(),
              saved: true,
              seen: false,
              failure: true,
              files: [
                {
                  name: files[0].name,
                  size: files[0].size,
                  type: files[0].type,
                  audio: true,
                  duration: 14.4,
                  url: files[0].localUrl
                }
              ]
            }
            break
          case 'sendContent':
            this.messages[messageId] = {
              _id: messageId,
              content: newContent,
              senderId: this.currentUserId,
              avatar: 'https://cdn.pixabay.com/photo/2021/08/22/22/51/yoda-6566301_960_720.jpg',
              username: 'John Show',
              timestamp: new Date().toString().substring(16, 21),
              date: new Date().toDateString(),
              saved: true,
              seen: false
            }
            break
        }
      }
      console.log(this.messages)
    },
    deleteMessages ({ roomId, message }) {
      console.log(roomId)
      console.log(message)
      this.messages.splice(message._id, 1) // 選択されたmessageを削除
      console.log(this.messages)
    },
    messageSelectionActionHandler ({ roomId, action, messages }) {
      switch (action.name) {
        case 'deleteMessages':
          for (let deleteIndex = 0; deleteIndex < messages.length; deleteIndex++) {
            for (let messageIndex = 0; messageIndex < this.messages.length; messageIndex++) {
              if (messages[deleteIndex]._id === this.messages[messageIndex]._id) {
                this.messages.splice(messageIndex, 1)
              }
            }
          }
          break
        case 'shareMessage':
          console.log(messages)
          break
      }
    },
    addNewMessage () {
      setTimeout(() => {
        this.messages = [
          ...this.messages,
          {
            _id: this.messages.length,
            content: 'NEW MESSAGE',
            senderId: '4',
            timestamp: new Date().toString().substring(16, 21),
            date: new Date().toDateString()
          }
        ]
      }, 2000)
    }
  }
})
</script>
