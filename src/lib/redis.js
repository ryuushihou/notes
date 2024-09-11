import { createClient } from 'redis';

const client = createClient({
    password: 'fBfNvAIhx2nwSwnxa6hUwYB5czUQTT82',
    socket: {
        host: 'redis-17821.c74.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 17821
    }
});

client.on('error', (err) => console.log('Redis Client Error', err));

// 连接函数
async function connectRedis() {
    if (!client.isOpen) {
        await client.connect();
    }
}

// 初始数据
const initialData = {
    "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
    "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
    "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
};

export async function getAllNotes() {
    await connectRedis();
    const data = await client.hGetAll("notes");
    if (Object.keys(data).length === 0) {
        await client.hSet("notes", initialData);
        return initialData;
    }
    return data;
}

export async function addNote(data) {
    await connectRedis();
    const uuid = Date.now().toString();
    await client.hSet("notes", uuid, data);
    return uuid;
}

export async function updateNote(uuid, data) {
    await connectRedis();
    await client.hSet("notes", uuid, data);
}

export async function getNote(uuid) {
    await connectRedis();
    const note = await client.hGet("notes", uuid);
    return JSON.parse(note);
}

export async function delNote(uuid) {
    await connectRedis();
    return await client.hDel("notes", uuid);
}

export default client;
