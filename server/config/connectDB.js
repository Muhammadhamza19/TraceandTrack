const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://fizza:1234567890@cluster0.yuphhgn.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true

}).then(() => {
    mongoose.set('strictQuery', true);
    console.log("Connection Successful")
}).catch((e) => {
    console.log(e)
})
mongoose.set('strictQuery', true);
