class SocketHandler {
    constructor(){
        this.handlers = [];
    }

    subscribe(handler){
        this.handlers.push(handler);
    }

    connect(game_id, player_id){
        this.ws = new WebSocket(`ws://localhost:8000/api/v1/ws/${game_id}/${player_id}`);
        this.ws.onmessage = (event) => (this.onMessage(event));
    }

    async disconnect(){
        await this.ws.close(1000, "shut down");
    }

    onMessage(message){
        var data = JSON.parse(message.data);
        this.handlers.map((handler)=>
            handler(data)
        )
    }

    async sendMessage(message){
        var json = await JSON.stringify(message);
        this.ws.send(json);
    }
}
export default SocketHandler;