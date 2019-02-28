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
                    Gauge the Resister
                </v-card-title>
                <!--<v-card-media contain>-->
                    <!--<v-img :src="reviewImgURL"></v-img>-->
                <!--</v-card-media>-->
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
                    Gauge the Resister
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
                behaviorImg: ""
            }
        },
        computed:{
            stepTemp:function () {
                return this.steps[this.activeValue];
            },
            //when all behaviors are finished, next button can be clicked
            //finishedBehavior is
            nextDisable:function () {
                if(this.steps[this.activeValue].finishedBehavior === this.steps[this.activeValue].behaviors.length){
                    return false;
                }
                else return true;
            }
        },
        created() {
            this.subsections = this.$route.query.subsection;
            console.log("aaa");
            console.log(this.subsections);
            for(let i = 0; i < this.subsections.length;i++){
                for(let j = 0; j < this.subsections[i].steps.length;j++){
                    this.subsections[i].steps[j].finishedBehavior = 0;
                    this.steps.push(this.subsections[i].steps[j]);
                }
            }
        },
        methods:{
            submitPicture(index, behavior){
                if(this.steps[this.activeValue].behaviors[index].severity === "high"){
                    this.$socket.emit("photo", this.behaviorImg, behavior);
                }
                if(this.steps[this.activeValue].behaviors[index].severity === "middle"){
                    this.$socket.emit("photo", this.behaviorImg, behavior);
                }
                if(this.steps[this.activeValue].behaviors[index].severity === "low"){
                    this.$socket.emit("photo", this.behaviorImg, behavior);
                }
            },
            next(){
                this.activeValue++;
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
            }
        }
    }
</script>

<style scoped>

</style>