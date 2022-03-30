import { reactive } from "vue";

const state = reactive({
    user: {
        username: 'username',
        steamid64: 'steamid64',
        avatar: 'avatar'
    },
    rooms: [],
    messages: [],
    socket: new ReconnectingWebSocket("ws://" + '127.0.0.1:8000' + "/ws/api/"),
    activeRoom: null,
    activeUser: null
});

// If query parameters has data for preseslecting 
function handleQuery() {
    let query = new URLSearchParams(window.location.search.split('?')[1]);
    if (query.has('u')) {
        createChat(query.get('u'));
    }
}

// Response handler functions
function ping(data) {
}

function get_user(data) {
    state.user.username = data.data.username
    state.user.steamid64 = data.data.steamid64
    state.user.avatar = data.data.avatar
}

function get_rooms(data) {
    state.rooms = data.data;
    makeActiveRoom(data.data[0].id);
}
function create_chat(data) {
    if (state.activeRoom != data.room){
        makeActiveRoom(data.room)
    }
}
function get_messages(data) {
    if (data.from_range != null){
        state.messages = [...data.data, ...state.messages];
    }else{
        state.messages = data.data
    }
}
function send_message(data) {
    state.messages = [...state.messages, data];
}


// Request functions
const pingSocket = () => {
    let data = { 'command': 'ping' };
    sendMessage(data)
}

const makeActiveRoom = (roomid) => {
    let room = findRoom(roomid);
    let user = findUser(room);

    state.activeRoom = roomid;
    state.activeUser = user;

    createChat(user.steamid64);
    getMessages();
}

const getUser = () => {
    let data = { 'command': 'get_user' };
    sendMessage(data)

}
const getRooms = () => {
    let data = { 'command': 'get_rooms' };
    sendMessage(data)

}
const createChat = (to_user) => {
    let data = { 'command': 'create_chat', 'to_user': to_user }
    sendMessage(data)
}

const sendChatMessage = (msg) => {
    let data = { 'command': 'send_message', 'room': state.activeRoom, 'message': msg };
    sendMessage(data)
}

const getMessages = (from_date) => {
    let data = { 'command': 'get_messages', 'room': state.activeRoom,'from_range':from_date }
    sendMessage(data)
}

// Handle socket response to their respective handler
const handleMessage = (event) => {
    var data = JSON.parse(event.data);
    if (data.status != 'success') {
    } else {
        responseCommands[data.command](data)
    }
}
const sendMessage = (data) => {
    data = JSON.stringify(data)
    state.socket.send(data)
}

// Function mapping
const responseCommands = {
    'ping': ping,
    'get_user': get_user,
    'get_rooms': get_rooms,
    'create_chat': create_chat,
    'get_messages': get_messages,
    'send_message': send_message,
}

const requestCommands = {
    'getUser': getUser,
    'pingSocket': pingSocket,
    'getRooms': getRooms,
    'createChat': createChat,
    'getMessages': getMessages,
    'sendChatMessage': sendChatMessage,
    'makeActiveRoom': makeActiveRoom
}

// helpers
function findUser(room) {
    let cUser = state.user.steamid64;
    for (let user of room.user) {
        if (user.steamid64 != cUser) {
            return user
        }
    }
}

function findRoom(roomid) {
    let rooms = state.rooms;
    for (let room of rooms) {
        if (room.id == roomid) {
            return room
        }
    }
}

export default {
    state: state,
    commands: requestCommands,
    handleMessage,
    handleQuery
}