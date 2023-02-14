require("dotenv").config()
const express = require('express');
const cors = require('cors');
const connectDB = require("./connectDB")
const morgan = require('morgan');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const profileRouter = require("./routes/profileRouter");
const chatRouter = require("./routes/chatRouter")
const userWalletRouter = require('./routes/userWalletRouter');
const nftCollectionRouter = require('./routes/nftCollectionRouter');
var cron = require('node-cron');
const { addOrUpdateNftCollection } = require("./controllers/nftCollectionController");
const SettingsModel = require("./models/SettingsModel");
const { syncOffAllWallet } = require("./controllers/userWalletController");
const socket = require("socket.io");

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
console.log("DATABASE_URL", DATABASE_URL)


app.use(cors())
app.use(morgan("dev"))

// Database Connection
connectDB(DATABASE_URL);


app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
// JSON
app.use(express.json({ limit: "1000mb" }));
app.set('trust proxy', true)
// Load Routes
//......chating Routres
app.use("/api/v1/chat", chatRouter)

app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/userWallet", userWalletRouter);
app.use("/api/v1/nftCollection", nftCollectionRouter)


// swagger API Documentation start
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "mangopeek-api API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				}
			}
		},
		security: [{
			bearerAuth: []
		}],
		servers: [
			{
				// url: "http://localhost:5001",
				url: "http://localhost:8800"
			},
		],
	},
	apis: ["./routes/*.js", "./api.yaml"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
// swagger API Documentation end

cron.schedule('*/9 * * * *', async () => {
	console.log("cron 2 running");

	syncOffAllWallet()
})



cron.schedule('*/10 * * * *', async () => {
	console.log("cron running");
	addOrUpdateNftCollection()


});


const server = app.listen(port, () => {
	console.log(`Server live at ${port}`);
})



// app.listen(port, () => {
//   console.log(`Server live at ${port}`);
// })



//Socket.io Connection with Node js Server
const io = socket(server, {
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	},
});



let users = [];
const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });

};



const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => user.userId == userId);
};



//Online User
let onlineUsers = [];
const addNewUser = (username, socketId) => {
	!onlineUsers.some((user) => user.username === username) &&
		onlineUsers.push({ username, socketId });
};


const removeOnlineUser = (socketId) => {
	onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getOnlineUser = (username) => {
	return onlineUsers.find((user) => user.username === username);
};


io.on("connection", (socket) => {
	//when ceonnectc
	console.log("a user is connected");
	io.emit("welcome", "hello welcome")

	//take userId and socketId from user
	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
		io.emit("getUser", users);
	});

	//send and get message
	socket.on("sendMessage", ({ senderId, receiverId, text }) => {
		const user = getUser(receiverId);
		io.to(user?.socketId).emit("getMessage", {
			senderId,
			text,
		});
	});

	//when disconnect
	socket.on("disconnect", () => {
		removeUser(socket.id);
		io.emit("getUser", users);
	});

	//Online user
	socket.on("newUser", (username) => {
		addNewUser(username, socket.id);
	});


	socket.on("sendNotification", ({ senderName, receiverName, type }) => {
		const receiver = getOnlineUser(receiverName);
		io.to(receiver?.socketId).emit("getNotification", {
			senderName,
			type,
		});
	});

	socket.on("sendText", ({ senderName, receiverName, text }) => {
		const receiver = getOnlineUser(receiverName);
		io.to(receiver?.socketId).emit("getText", {
			senderName,
			text,
		});
	});


	socket.on("disconnect", () => {
		removeOnlineUser(socket.id);
	});

});

io.listen(5000);

