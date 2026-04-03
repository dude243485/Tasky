import quit from "../assets/block.png"
import art from "../assets/art-studies.png"
import task from "../assets/task.png"
import meditation from "../assets/meditation.png"
import study from "../assets/graduation-hat.png"
import sports from "../assets/running.png"
import entertainment from "../assets/theater.png"
import social from "../assets/chatting.png"
import finance from "../assets/dollar-symbol.png"
import health from "../assets/health-care.png"
import work from "../assets/suitcase.png"
import nutrition from "../assets/restaurant.png"



export interface category{
    label : string;
    image : string;
    color : string
}
export const Categories = {
    "quit" : {
        label: "Quit bad habit" ,
        image : quit,
        color : "#EB0707"
    },
    "art" : {
        label : "Art",
        image : art,
        color : "#FF4C24"
    },
    "task" : {
        label : "Task",
        image : task,
        color : "#A51C1E"
    },
    "meditation" : {
        label : "Meditation",
        image : meditation,
        color : "#D90C91"
    },
    "study" : {
        label : "Study",
        image : study,
        color : "#7907EB"
    },
    "sports" : {
        label : "Sports",
        image : sports,
        color : "#3D53DB"
    },
    "entertainment" : {
        label : "Entertainment",
        image : entertainment,
        color : "#1BB196"
    },
    "social" : {
        label : "Social",
        image : social,
        color : "#1BAC4C"
    },
    "finance" : {
        label : "Finance",
        image : finance,
        color : "#47A311"
    },
    "health" : {
        label : "Health",
        image : health,
        color : "#D6B810"
    },
    "work" : {
        label : "Work",
        image : work,
        color : "#E69A00"
    },
    "nutrition" : {
        label : "Nutrition",
        image : nutrition,
        color : "#E66C00"
    },

}