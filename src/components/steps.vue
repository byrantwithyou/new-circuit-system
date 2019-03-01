<template>
    <div>
        <el-steps :active="activeValue" align-center>
            <el-step  v-for="(step,index) in steps" :key="step.content">
                <div>{{step.content}}</div>
            </el-step>
            <el-button style="margin-top: 12px;" @click="next" :disabled="nextDisable">next</el-button>
        </el-steps>




        <!--this part should be combined with app-->
        <el-card>
            <h3>{{stepTemp.content}}</h3>
            <h3>You should pay attention to these behaviors:</h3>
            <div v-for="(behavior,index) in stepTemp.behaviors" :key="behavior.tutorial">
                <div>
                    {{behavior.tutorial}}
                </div>
                <el-button @click="submitPicture(index, behavior)">submit</el-button>
            </div>
        </el-card>


        <v-dialog  v-model="reviewDialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    {{behaviorTitle.name}}
                </v-card-title>
                <v-card-media contain>
                    <v-img :src="reviewImgURL"></v-img>
                </v-card-media>
                <v-card-text>
                    <v-text-field v-model="comment" label="Comment" required></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn outline small @click="comment='Your wire is problematic'">Your wire is problematic</v-btn>
                    <v-btn outline small @click="comment='Mind the polarity'">Mind the polarity</v-btn>
                </v-card-actions>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" icon>
                        <v-icon @click="right">done</v-icon>
                    </v-btn>
                    <v-btn @click="wrong" color="primary" icon>
                        <v-icon>clear</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog  v-model="reviewResultDialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    {{reviewResultBehavior.name}}
                </v-card-title>
                <v-card-media contain>
                    <v-img :src="reviewResultImgURL"></v-img>
                </v-card-media>
                <v-card-text>
                    {{reviewComment}}
                    <br>
                    {{reviewIcon}}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon small @click="reviewResultDialog=false"><v-icon>close</v-icon></v-btn>
                    <v-btn @click="sendToTeacher">Send Again to teacher</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "steps",
        data(){
            return{
                subsections:[],
                steps:[],
                activeValue:0,
                behaviorImg: "",
                reviewDialog: false,
                behaviorTitle:"",
                reviewImgURL: "",
                comment: "",
                userLoopBack: "",
                severity:"",
                reviewResultDialog: false,
                reviewResultImgURL: "",
                reviewComment: "",
                reviewIcon: "",
                reviewResultBehavior:"",
                reviewResultSeverity:"",
                nextDisableFlag:true,
                toBeFinishedBehavior:0,
                finishedBehavior:0

            }
        },
        computed:{
            stepTemp:function () {
                return this.steps[this.activeValue];
            },
            //when all behaviors are finished, next button can be clicked
            //finishedBehavior is
            nextDisable: function() {
                console.log("NEXTDISABLE");
            
                return !(this.finishedBehavior === this.toBeFinishedBehavior);
                            }
        },
        created() {
            this.subsections = this.$route.query.subsection;
            console.log("aaa");
            console.log(this.subsections);
            for(let i = 0; i < this.subsections.length;i++){
                for(let j = 0; j < this.subsections[i].steps.length; j++){
                    this.subsections[i].steps[j].finishedBehavior = 0;
                    this.steps.push(this.subsections[i].steps[j]);
                }
            }
            this.toBeFinishedBehavior = this.steps[0].behaviors.length;
            
        },
        methods:{
            right: function() {
                this.reviewDialog = false;
                this.$socket.emit("review", 1, this.reviewImgURL, this.behaviorTitle, this.userLoopBack, this.comment, this.severity);
            },
            wrong: function() {
                this.reviewDialog = false;
                this.$socket.emit("review", 0, this.reviewImgURL, this.behaviorTitle, this.userLoopBack, this.comment, this.severity);
            },
            sendToTeacher: function() {
                this.reviewResultDialog = false;
                this.$socket.emit("photoToTeacher", this.reviewResultImgURL, "dsf", 1);
            },
            submitPicture(index, behavior){
                if(this.steps[this.activeValue].behaviors[index].severity === "high"){
                    this.$socket.emit("photo", this.behaviorImg, behavior,"high");
                }
                if(this.steps[this.activeValue].behaviors[index].severity === "middle"){
                    this.finishedBehavior++;
                    console.log("middle");
                    this.$socket.emit("photo", this.behaviorImg, behavior,"middle");
                }
                if(this.steps[this.activeValue].behaviors[index].severity === "low"){
                    this.$socket.emit("photo", this.behaviorImg, behavior,"low");
                    this.finishedBehavior++;
                    console.log("low");
                }
            },
            next(){
                this.activeValue++;
                this.toBeFinishedBehavior = this.steps[this.activeValue].behaviors.length;
                this.finishedBehavior = 0;
                // if(!steps[i].behaviors){
                //     this.activeValue ++;
                // }
                // else {
                //     let maxSeverity = "";
                //     for(let j = 0; j < steps[i].behaviors.length;j++){
                //         if(steps[i].behaviors[j].severity === "high"){
                //             maxSeverity = "high";
                //         }
                //         else if(steps[i].behaviors[j].severity === "middle" && maxSeverity !== "high"){
                //             maxSeverity = "middle";
                //         }
                //         else if(steps[i].behaviors[j].severity === "low" && maxSeverity !=="high" && maxSeverity !== "middle"){
                //             maxSeverity = "low";
                //         }
                //     }
                //     if(maxSeverity === "high"){
                //         //block
                //         this.nextDisable = true;
                //         //photo: img,behavior,severity
                //         //img and behavior is to be rewritten
                //         this.$socket.emit("photo",1,1,3);
                //         this.$message('Wait till your behavior is reviewed with no error because the behavior has a high severity!');
                //     }
                //     else if(maxSeverity === "middle"){
                //         //not block
                //         this.$socket.emit("photo",1,1,3);
                //         this.activeValue ++;
                //     }
                //     else{
                //         this.activeValue ++;
                //     }
                // }
            },


        },
        sockets: {
            getMobilePhoto: function(data) {
                this.behaviorImg = data;
            },
            photoToJudge: function(data) {
                this.reviewDialog = true;
                this.behaviorTitle = data[1];
                this.reviewImgURL = data[0];
                this.userLoopBack = data[2];
                this.severity = data[3];
            },
            reviewResult: function(data) {
                this.reviewResultDialog = true;
                this.reviewComment = data[3];
                this.reviewResultBehavior = data[2];
                this.reviewResultSeverity = data[4];
                this.reviewResultImgURL = data[0];
                if (data[1] === 1) {
                    this.reviewIcon = "Right";
                    if(data[4] === "high"){
                        console.log("high");
                        this.finishedBehavior ++;
                    }
                }
                else {
                    this.reviewIcon = "Wrong";
                }
            }
        }
    }
</script>

<style scoped>

</style>