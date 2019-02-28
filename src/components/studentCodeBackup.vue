<template>
    <div>
        <div v-if="step==1">
            <div>
                <v-card>
                    <v-card-title>
                        Tutorial -- Please select the best order
                    </v-card-title>
                    <v-card-media>
                        <div align="center">
                            <img height="150px" width="400px" src="demo.png">
                        </div>
                    </v-card-media>

                    <div>
                        <!--<draggable class="list-group" v-model="subsections">-->
                        <!--<transition-group style="display: block">-->
                        <!--<li class="list-group-item" v-for="subsection in subsections" :key="subsection.name">-->
                        <!--{{subsection.name}}-->
                        <!--</li>-->
                        <!--<draggable class="list-group" v-model="subsection.steps">-->
                        <!--<transition-group style="display: block">-->
                        <!--<li class="list-group-item" v-for="element in subsection.steps" :key="element.id">-->
                        <!--{{element.content}}-->
                        <!--</li>-->
                        <!--</transition-group>-->
                        <!--</draggable>-->

                        <!--</transition-group>-->
                        <!--</draggable>-->
                        <draggable :list="subsections" :options = "{forceFallback:true}">
                            <div v-for="subsection in subsections" :key="subsection.name">
                                <div class="subsections">
                                    {{subsection.name}}
                                </div>
                                <draggable :list="subsection.steps" :options = "{forceFallback:true}">
                                    <div v-for="step in subsection.steps" :key="step.id">
                                        <div class="steps">
                                            {{step.content}}
                                        </div>
                                    </div>
                                </draggable>
                            </div>
                        </draggable>
                    </div>


                    <!--<v-card-text>-->
                    <!--<v-radio-group v-model="order">-->
                    <!--<v-radio key="1" value="1" label="Insert the Power Subsection, then the Resister subsection"></v-radio>-->
                    <!--<v-radio key="2" value="2" label="Insert the Resister subsection, then the Power subsection"></v-radio>-->
                    <!--</v-radio-group>-->
                    <!--</v-card-text>-->
                </v-card>
            </div>
        </div>
        <!--step2 v-if="step==2"></step2-->
        <step3 v-if="step==2"></step3>
        <step4 v-if="step==3"></step4>
        <!--step5 v-if="step==4"></step5-->
        <step6 v-if="step==4"></step6>
        <step7 v-if="step==5"></step7>
    </div>
</template>

<script>
    import draggable from "vuedraggable"
    import step1 from "@/components/step1";
    import step3 from "@/components/step3";
    import step4 from "@/components/step4";
    import step6 from "@/components/step6";
    import step7 from "@/components/step7";

    export default {
        data: () => ({
            subsections:[]
        }),
        name: "student",
        computed: {
            step: function() {
                return this.$store.state.step.step;
            }
        },
        methods: {
            test: function() {
                this.$store.commit("step/addStep");
            }
        },
        components: {
            draggable,
            step3,
            step4,
            step6,
            step7
        },
        sockets: {
            photoToJudge: function(data) {
                console.log(data);
            },
            authoring: function(data) {
                let subsections = data[0];
                let behaviors = data[1];
                console.log("subsections");
                console.log(subsections);
                console.log("behaviors");
                console.log(behaviors);
                this.subsections = subsections;
            }
        }
        ,
        created: function() {
            console.log(this.$socket.id);
        }
    }
</script>

<style>
    .subsections{
        border: 1px solid gray;
        width:800px;
        /*min-height: 80px;*/
        /*height:80px;*/
        /*line-height: 80px;*/
        /*text-align: center;*/
        /*font-size:20px;*/
        /*margin:1px 0px;*/
        cursor: move;
    }
    .steps{
        border: 1px solid #BBBBBB;
        width:800px;
        /*min-height: 60px;*/
        /*height:60px;*/
        /*line-height: 60px;*/
        /*text-align: center;*/
        /*font-size:16px;*/
        /*margin:1px 0px;*/
        cursor: move;
    }
</style>
