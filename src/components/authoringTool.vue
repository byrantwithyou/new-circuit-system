<template>
  <el-container style="height: 100%;" direction="vertical">
  <el-header class="head" height="1px">
    <h1>authoring tool</h1>
  </el-header>
  <el-main>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="" name="zero"></el-tab-pane>
    <el-tab-pane label="subsection" name="second">
      <el-container>
        <el-main>
          <h2>STEPS</h2>
          <div class="row">
            <el-button @click="addSubsection" style="height: 50px;margin-left: 300px">add subsection</el-button>
          </div>
          <el-row>
            <el-col :span="4" v-for="subsection in subsections" :key="subsection.id" :offset="2" style="margin-bottom:40px;margin-right:40px;margin-left: 60px">

              <el-card :body-style="{ padding: '0px', height:'360px'}" shadow="hover" style="width: 240px;min-height:500px;background: seashell;border-radius: 20px">
                <div style="padding: 6px;height: 310px;">
                  <div slot="header">
                    <span style="margin-left: 40px">{{subsection.name}}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="closeCard($index)">close</el-button>
                  </div>

                  <div style="margin-left: 30px">steps</div>
                  <div style="position: relative;top: 10px;min-height:200px">
                    <draggable class="list-group" v-model="subsection.steps" :options="{group:'step'}" @change="sendUpdateAuthoring">
                      <transition-group>
                        <li class="list-group-item" v-for="element in subsection.steps" :key="element.id">
                          {{element.content}}
                        </li>
                      </transition-group>
                    </draggable>
                  </div>
                  <br/>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>


        <el-aside width="280px" style="background: seashell;min-height: 600px;border-radius: 20px">
          <h4>steps</h4>
          <div class="col-md-12">
            <draggable class="list-group" v-model="components" :options="{group:'step'}">
              <transition-group>
                <li class="list-group-item" v-for="element in components" :key="element.id">
                  {{element.content}}
                </li>
              </transition-group>
            </draggable>
          </div>
        </el-aside>
      </el-container>
    </el-tab-pane>










    <el-tab-pane label="steps" name="first">
      <el-container>
        <el-main>
          <h2>STEPS</h2>
          <div class="row">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :before-upload="beforeUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove">
              <el-button slot="trigger" style="height: 50px;margin-right: 400px">open file</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>


          </div>


          <el-row>
            <el-col :span="4" v-for="(element1,index) in steps" :key="element1.id" :offset="2" style="margin-bottom:40px;margin-right:40px;margin-left: 60px">

              <el-card :body-style="{ padding: '0px', height:'360px'}" shadow="hover" style="width: 240px;min-height:500px;background: seashell;border-radius: 20px">
                <div style="padding: 6px;height: 310px;">
                  <div slot="header">
                    <h3 style="margin-left: 40px">STEP</h3>
                    </div>
                  <br>

                  <h4>name</h4>
                  <span>{{element1.content}}</span>
                  <h4>behavior</h4>
                    <!--<draggable class="list-group" v-model="element1.behaviors" :options="{group:'behavior'}" @change="addStep">-->
                      <!--<transition-group>-->
                        <!--<li class="list-group-item" v-for="element in element1.behaviors" :key="element.name">-->
                          <!--{{element.name}}-->
                        <!--</li>-->
                      <!--</transition-group>-->
                    <!--</draggable>-->
                    <div class="list-group" v-model="element1.behaviors">
                      <li class="list-group-item" v-for="element in element1.behaviors">
                        {{element}}
                      </li>
                    </div>
                    <el-select v-model="tmpBehaviorForStep" placeholder="please choose" @change="addBehaviorForStep(index)">
                      <el-option
                        v-for="item in behaviors"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </div>



              </el-card>
            </el-col>
          </el-row>
        </el-main>


        <el-aside width="280px" style="background: seashell;min-height: 600px;border-radius: 20px">
          <h4>behaviors</h4>
          <draggable class="list-group" v-model="behaviors" :options="{group:{name:'behavior',pull:'clone',put:false}}">
            <transition-group>
              <li class="list-group-item" v-for="element in behaviors" :key="element.name">
                {{element.name}}
              </li>
            </transition-group>
          </draggable>
        </el-aside>

      </el-container>
    </el-tab-pane>











    <el-tab-pane label="behavior" name="third">
      <el-button type="primary" @click="dialogFormVisible = true">add behavior</el-button>
      <el-container style="margin-left: 100px;margin-right: 100px">
        <el-table
          :data="behaviors"
          border
          empty-text="no data"
          >
          <el-table-column
            prop="name"
            label="name"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="tutorial"
            label="tutorial"
            min-width="50%">
          </el-table-column>
          <el-table-column
            prop="severity"
            label="severity"
            min-width="15%">
          </el-table-column>
          <el-table-column
            label="operation"
            min-width="15%">
            <template slot-scope="scope">
              <el-button @click="deleteBehavior(scope.$index)" size="small" type="danger">delete</el-button>
              <el-button @click="changeBehavior(scope.row,scope.$index)" size="small" type="primary">edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-container>

      <el-dialog title="add behavior" :visible.sync="dialogFormVisible">
        <el-form :model="behavior">
          <el-form-item label="behavior name" label-width="120px">
            <el-input v-model="behavior.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="behavior tutorial" label-width="120px">
            <el-input v-model="behavior.tutorial" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="severity" label-width="120px">
            <el-select v-model="behavior.severity" placeholder="please choose">
              <el-option label="low" value="low"></el-option>
              <el-option label="middle" value="middle"></el-option>
              <el-option label="high" value="high"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">cancel</el-button>
          <el-button type="primary" @click="confirmBehavior">ok</el-button>
        </div>
      </el-dialog>

      <el-dialog title="change behavior" :visible.sync="changeDialogVisible">
        <el-form :model="tmpBehavior">
          <el-form-item label="behavior name" label-width="120px">
            <el-input v-model="tmpBehavior.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="behavior tutorial" label-width="120px">
            <el-input v-model="tmpBehavior.tutorial" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="severity" label-width="120px">
            <el-select v-model="tmpBehavior.severity" placeholder="please choose">
              <el-option label="low" value="low"></el-option>
              <el-option label="middle" value="middle"></el-option>
              <el-option label="high" value="high"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">

          <el-button @click="changeDialogVisible = false">cancel</el-button>
          <el-button type="primary" @click="confirmChangeBehavior">ok</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>


    <el-tab-pane label="other settings" name="forth">
    <el-container style="position: relative;margin:auto">
      <el-form :model="settings" style="position: relative;margin:auto">
        <el-form-item label="How many times can a student be deemed to have been familiar with a behavior?">
         <br>
        <el-select v-model="settings.trueTimes" placeholder="Please choose" style="position: absolute;right: 0px" @change="sendUpdateAuthoring">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
          <el-option label="6" value="6"></el-option>
          <el-option label="never" value="never"></el-option>
        </el-select>
        </el-form-item>
        <br>


        <el-form-item label="What is the probability to check the behavior again if a student has been familiar with a behavior?">
          <br>
          <el-select v-model="settings.probability" placeholder="Please choose" style="position: absolute;right: 0px" @change="sendUpdateAuthoring">
            <el-option label="0.0" value="0.0"></el-option>
            <el-option label="0.2" value="0.2"></el-option>
            <el-option label="0.4" value="0.4"></el-option>
            <el-option label="0.6" value="0.6"></el-option>
            <el-option label="0.8" value="0.8"></el-option>
            <el-option label="1.0" value="1.0"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-button type="primary" @click="confirmSettings">OK</el-button>
      </el-form>
    </el-container>
    </el-tab-pane>
  </el-tabs>
  </el-main>
  </el-container>




</template>

<script>
  import draggable from 'vuedraggable'
  import io from 'socket.io-client';
  const xml2js = require('xml2js');
  let parser = new xml2js.Parser();
    export default {
      name: "authoringTool",
      data(){
        return{
          socket:null,
          random:0,
          components:[],
          subsections:[],
          steps:[],
          stepNumber:1,
          activeName: 'second',
          dialogFormVisible:false,
          changeDialogVisible:false,
          listIndex:null,
          tmpBehaviorForStep:null,
          settings:{
            trueTimes:null,
            probability:null
          },
          tmpBehavior:{
            name:null,
            tutorial:null,
            severity:null
          },
          behavior:{
            name:null,
            tutorial:null,
            severity:null
          },
          behaviors:[
            {
              name:"resistance measurement",
              tutorial:" Please measure the resistance before inserting resistors.",
              severity:"high"
            },
            {
              name:"led polarity",
              tutorial:"Please make sure the LEDs' polarity is correct before insertion.",
              severity:"middle"
            },
            {
              name:"wire crossing",
              tutorial:"Please avoid crossing wires and go for 90° wire bends.",
              severity:"low"
            },
            {
              name:"power line usage",
              tutorial:"Please make sure the usage of the power line is true.",
              severity:"middle"
            }
          ]
        };
      },
      components:{
        draggable
      },
      created(){
        this.socket = io.connect('http://localhost:8089');
      },
      methods: {
        sendUpdateAuthoring(){

          this.socket.emit('authoring',this.subsections,this.behaviors,this.settings);

        },
        addBehaviorForStep(id){
          console.log(this.steps);
          console.log(id);
          let that = this;
          let tmpBhvir = that.tmpBehaviorForStep;
          that.steps[id].behaviors.push(tmpBhvir);
          that.tmpBehaviorForStep = null;
          this.socket.emit('authoring',this.subsections,this.behaviors,this.settings);

        },
        addStep(){
          console.log(this.steps);
        },
        closeCard(id){
          this.subsections.splice(id,1);
          this.socket.emit('authoring',this.subsections,this.behaviors,this.settings);
        },
        deleteBehavior(index){
          this.behaviors.splice(index,1);
          this.socket.emit('authoring',this.subsections,this.behaviors,this.settings);
        },
        confirmSettings(){

        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        changeBehavior(row,index){
          this.listIndex = index;
          this.tmpBehavior = row;
          this.changeDialogVisible = true;
        },
        confirmBehavior(){
          if(this.behavior.name === null || this.behavior.severity === null){
            this.$message({
              message: "Please input the name and severity of behavior!",
              type: 'warning'
            });
          }
          else if(this.behavior.name !== null && this.behavior.severity !== null){
            let that = {};
            that.name = this.behavior.name;
            that.tutorial = this.behavior.tutorial;
            that.severity = this.behavior.severity;
            console.log(that);
            this.behaviors.push(that);
            console.log(this.behaviors);
            this.behavior.name = null;
            this.behavior.tutorial = null;
            this.behavior.severity = null;
            this.dialogFormVisible = false;
            this.socket.emit('authoring',this.subsections,this.behaviors,this.settings);
          }
        },

        confirmChangeBehavior(){
          if(this.tmpBehavior.name === null || this.tmpBehavior.severity === null){
            this.$message({
              message: "Please input the name and severity of behavior!",
              type: 'warning'
            });
          }
          else if(this.tmpBehavior.name !== null && this.tmpBehavior.severity !== null){
            let that = {};
            that.name = this.tmpBehavior.name;
            that.tutorial = this.tmpBehavior.tutorial;
            that.severity = this.tmpBehavior.severity;
            console.log(that);
            this.behaviors[this.listIndex] = that;
            this.tmpBehavior.name = null;
            this.tmpBehavior.tutorial = null;
            this.tmpBehavior.severity = null;
            this.changeDialogVisible = false;
            this.socket.emit('authoring',this.subsections,this.behaviors,this.settings);
          }
        },

        beforeUpload(file) {
          var that = this;
          if(that.components){
            that.components = [];
          }
          if(window.FileReader){
            var fr = new FileReader();
            fr.onload = function() {
              parser.parseString(this.result,function (err,res) {
                if(err) throw err;
                var instances = res.module.instances[0].instance;
                for(var i = 0; i < instances.length ; i += 1){
                  let instance = instances[i];
                  //console.log(instance);


                  if(instance.$.moduleIdRef === "Arduino Nano3(fix)"){
                    let component = {};
                    component.type = 'Arduino Nano3(fix)';
                    component.id = instance.$.modelIndex;
                    component.flag = 0;
                    component.value = {};
                    let connectors = instance.views[0].breadboardView[0].connectors;
                    let connector = connectors[0].connector;
                    // for(let connectid in connector){
                    //   if(connector[connectid].$.connectorId === "connector30"){
                    //     component.end0 = connector[connectid].connects[0].connect[0].$.connectorId;
                    //   }
                    //   if(connector[connectid].$.connectorId === "connector31"){
                    //     component.end1 = connector[connectid].connects[0].connect[0].$.connectorId;
                    //   }
                    // }
                    //console.log(component);
                    component.end0 = 0;
                    component.end1 = 0;
                    console.log(component);
                    that.components.push(component);
                  }


                  if(instance.$.moduleIdRef === "arduino_Uno_Rev3(fix)"){
                    let component = {};
                    component.type = 'arduino_Uno_Rev3(fix)';
                    component.id = instance.$.modelIndex;
                    component.flag = 0;
                    component.value = {};
                    let connectors = instance.views[0].breadboardView[0].connectors;
                    let connector = connectors[0].connector;
                    component.end0 = 0;
                    component.end1 = 0;
                    // for(let connectid in connector){
                    //   if(connector[connectid].$.connectorId === "connector30"){
                    //     component.end0 = connector[connectid].connects[0].connect[0].$.connectorId;
                    //   }
                    //   if(connector[connectid].$.connectorId === "connector31"){
                    //     component.end1 = connector[connectid].connects[0].connect[0].$.connectorId;
                    //   }
                    // }
                    console.log(component);
                    that.components.push(component);
                  }

                  else if(instance.$.moduleIdRef === "5mmColorLEDModuleID" || instance.$.moduleIdRef === "1206ColorLEDModuleID"){
                    let component = {};
                    component.type = 'led';
                    component.id = instance.$.modelIndex;
                    component.flag = 0;
                    component.value = {};
                    for(let prop in instance.property){
                      component.value[instance.property[prop].$.name] = instance.property[prop].$.value;
                    }
                    let connectors = instance.views[0].breadboardView[0].connectors;
                    let connector = connectors[0].connector;
                    for(let connectid in connector){
                      if(connector[connectid].$.connectorId === "connector0"){
                        let connect = connector[connectid].connects[0].connect;
                        for(let cid in connect){
                          if(connect[cid].$.layer === "breadboardbreadboard"){
                            component.end0 = connect[cid].$.connectorId;
                          }
                        }
                      }
                      if(connector[connectid].$.connectorId === "connector1"){
                        let connect = connector[connectid].connects[0].connect;
                        for(let cid in connect){
                          if(connect[cid].$.layer === "breadboardbreadboard"){
                            component.end1 = connect[cid].$.connectorId;
                          }
                        }
                      }
                    }
                    //console.log(component);
                    console.log(component);
                    that.components.push(component);
                  }
                  else if(instance.$.moduleIdRef === "WireModuleID"){
                    let component = {};
                    if(!instance.views[0].breadboardView) continue;
                    component.type = 'wire';
                    component.value = 0;
                    component.id = instance.$.modelIndex;
                    component.flag = 0;
                    let connectors = instance.views[0].breadboardView[0].connectors;
                    let connector = connectors[0].connector;
                    for(let connectid in connector){
                      if(connector[connectid].$.connectorId === "connector0"){
                        let connect = connector[connectid].connects[0].connect;
                        for(let cid in connect){
                          if(connect[cid].$.connectorId > "pin"){
                            component.end0 = connect[cid].$.connectorId;
                          }
                          else{
                            component.end0 = {};
                            component.end0.targetEnd = connect[cid].$.connectorId;
                            component.end0.target = connect[cid].$.modelIndex;
                          }
                        }
                      }
                      if(connector[connectid].$.connectorId === "connector1"){
                        let connect = connector[connectid].connects[0].connect;
                        for(let cid in connect){
                          if(connect[cid].$.connectorId > "pin"){
                            component.end1 = connect[cid].$.connectorId;
                          }
                          else{
                            component.end1 = {};
                            component.end1.targetEnd = connect[cid].$.connectorId;
                            component.end1.target = connect[cid].$.modelIndex;
                          }
                        }
                      }
                    }
                    if(component.end1 && component.end0) that.components.push(component);
                  }
                  else if(instance.$.moduleIdRef === "lijaeag5654yx6narfd346gnn-ResistorModuleID" || instance.$.moduleIdRef === "ResistorModuleID"){
                    let component = {};
                    component.type = 'resistor';
                    component.id = instance.$.modelIndex;
                    component.value = {};
                    for(let prop in instance.property){
                      component.value[instance.property[prop].$.name] = instance.property[prop].$.value;
                    }
                    component.flag = 0;
                    let connectors = instance.views[0].breadboardView[0].connectors;
                    let connects0 = connectors[0].connector[0].connects[0].connect;
                    for(let connect in connects0){
                      //console.log(connects0[connect]);
                      if(connects0[connect].$.layer === "breadboardbreadboard"){
                        component.end0 = connects0[connect].$.connectorId;
                      }
                    }
                    let connects1 = connectors[0].connector[1].connects[0].connect;
                    //console.log(connects1);
                    for(let connect in connects1){
                      //console.log(connects1[connect]);
                      if(connects1[connect].$.layer === "breadboardbreadboard"){
                        component.end1 = connects1[connect].$.connectorId;
                      }
                    }
                    console.log(component);
                    that.components.push(component);
                  }
                }
                //to cut wire
                for(let i = that.components.length-1; i >= 0; i--){
                  //final: flag === 2
                  if(!that.components[i].end0.target && !that.components[i].end1.target){
                    that.components[i].flag = 2;
                  }
                  if(that.components[i].end0.target && (!that.components[i].end1.target)){
                    // visited: flag === 1
                    if(that.components[i].flag === 1){
                      continue;
                    }
                    that.components[i].flag = 2;
                    that.components[i].end0 = that.otherEnd(that.components[i].end0);
                  }
                  if(!that.components[i].end0.target && that.components[i].end1.target){
                    // visited: flag === 1
                    if(that.components[i].flag === 1){
                      continue;
                    }
                    that.components[i].flag = 2;
                    that.components[i].end1 = that.otherEnd(that.components[i].end1);
                  }
                }
                for(let i = that.components.length-1; i >= 0; i--){
                  if(that.components[i].flag !== 2){
                    that.components.splice(i,1);
                  }
                }
                console.log("_______________________________________");
                console.log(that.components);
                for(let i = 0; i < that.components.length;i++){
                  if(that.components[i].type === "Arduino Nano3(fix)"){
                    that.components[i].content = "Please add "+that.components[i].type+" (id:"+that.components[i].id+")";
                  }
                  else if(that.components[i].type === "arduino_Uno_Rev3(fix)"){
                    that.components[i].content = "Please add "+that.components[i].type+" (id:"+that.components[i].id+")";
                  }
                  else if(that.components[i].type === "wire"){

                    let friend1 = "";
                    if(!that.components[i].end0.target){
                      console.log(that.components[i]);
                      let friendTmp = that.findFriend(that.components[i].end0);
                      for(let k = 0; k < friendTmp.length;k++){
                        friend1 += friendTmp[k]+" ";
                      }
                    }
                    else{
                      friend1 += (that.components[i].end0.target + that.components[i].end0.targetEnd);
                    }

                    let friend2 = "";
                    if(!that.components[i].end1.target){
                      let friendTmp = that.findFriend(that.components[i].end1);
                      for(let k = 0; k < friendTmp.length;k++){
                        friend2 += friendTmp[k]+" ";
                      }
                    }
                    else{
                      friend2 += (that.components[i].end1.target + that.components[i].end1.targetEnd);
                    }


                    that.components[i].content = "Please add wire connecting {"+friend1+"} to {"+friend2+"}";
                  }
                  else if(that.components[i].type === "resistor"){
                    let friend1 = that.findFriend(that.components[i].end0);
                    let friend2 = that.findFriend(that.components[i].end1);
                    let friend = "";
                    for(let k = 0; k < friend1.length;k++){
                      friend += friend1[k]+" ";
                    }
                    for(let k = 0; k < friend2.length;k++){
                      friend += friend2[k]+" ";
                    }
                    that.components[i].content = "Please add a "+that.components[i].value['resistance']+"Ω "+that.components[i].type+"      reference position:"+that.components[i].end0+" and "+that.components[i].end1+ "      reference id:"+that.components[i].id;

                    //that.components[i].content = "Please add "+that.components[i].type + " (id:"+that.components[i].id+")"+" resistance:"+that.components[i].value['resistance']+ " connect to:"+friend;
                  }
                  else if(that.components[i].type === "led"){
                    let friend1 = that.findFriend(that.components[i].end0);
                    let friend2 = that.findFriend(that.components[i].end1);
                    let friend = "";
                    for(let k = 0; k < friend1.length;k++){
                      friend += friend1[k]+" ";
                    }
                    for(let k = 0; k < friend2.length;k++){
                      friend += friend2[k]+" ";
                    }
                    that.components[i].content = "Please add a "+that.components[i].value['color']+" "+that.components[i].type+"      reference position:"+that.components[i].end0+" and "+that.components[i].end1+ "      reference id:"+that.components[i].id;
                    //that.components[i].content = "Please add "+that.components[i].type + " (id:"+that.components[i].id+")"+" color:"+that.components[i].value['color']+ " connect to:"+friend;
                  }
                }
                that.steps = that.components;
                for(let i = 0; i < that.steps.length;i++){
                  that.steps[i].behaviors = [];
                }
                that.socket.emit('authoring',that.subsections,that.behaviors,that.settings);
              })
            };
            fr.readAsText(file);
          }
        },
        otherEnd(end) {
          if(!end.target){
            return end;
          }
          else{
            let toWire = end.target;
            let toEnd = end.targetEnd;
            let find = 0;
            for(let i = 0; i < this.components.length; i++){
              if( this.components[i].id === toWire){
                find = 1;
                this.components[i].flag = 1;
                if(this.components[i].type !== 'wire'){
                  return {
                    target:this.components[i].type,
                    targetEnd:toEnd
                  }
                }
                if(toEnd === 'connector0'){
                  return this.otherEnd(this.components[i].end1);
                }
                else if(toEnd === 'connector1'){
                  return this.otherEnd(this.components[i].end0);
                }
              }
            }
            if(find === 0){
              return "not found";
            }
          }
        },

        findFriend(pos){
          let friendComponents = [];
          if(pos.target){
            console.log(pos);
            return friendComponents;
          }
          let posX = pos.match(/pin(\d+)(.*)/)[1];
          let posY = pos.match(/pin(\d+)(.*)/)[2];
          for(let i = 0 ; i < this.components.length;i++){
            if(this.components[i].end0 > "pin"){
              let comX = this.components[i].end0.match(/pin(\d+)(.*)/)[1];
              let comY = this.components[i].end0.match(/pin(\d+)(.*)/)[2];
              if(posX === comX && posY === comY) break;
              if(posX === comX){
                if('A' <= posY && posY <= 'E' && comY <='E' && 'A'<= comY){
                  friendComponents.push(this.components[i].id+": "+this.components[i].type);
                }
                else if('F' <= posY && posY <= 'J' && comY <='J' && 'F'<= comY){
                  friendComponents.push(this.components[i].id+": "+this.components[i].type);
                }
              }
              if(posY === comY){
                if(posY === "W" || posY === "X" || posY === "Y" || posY === "Z"){
                  friendComponents.push(this.components[i].id+": "+this.components[i].type);
                }
              }
            }
            if(this.components[i].end1 > "pin"){
              let comX = this.components[i].end1.match(/pin(\d+)(.*)/)[1];
              let comY = this.components[i].end1.match(/pin(\d+)(.*)/)[2];
              if(posX === comX && posY === comY) break;
              if(posX === comX){
                if('A' <= posY && posY <= 'E' && comY <='E' && 'A'<= comY){
                  friendComponents.push(this.components[i].id+": "+this.components[i].type);
                }
                else if('F' <= posY && posY <= 'J' && comY <='J' && 'F'<= comY){
                  friendComponents.push(this.components[i].id+": "+this.components[i].type);
                }
              }
              if(posY === comY){
                if(posY === "W" || posY === "X" || posY === "Y" || posY === "Z"){
                  friendComponents.push(this.components[i].id+": "+this.components[i].type);
                }
              }
            }
          }
          return friendComponents;
        },

        addSubsection(){
          console.log("add subsection");
          let subsection = {};
          subsection.id = this.stepNumber;
          this.stepNumber += 1;
          subsection.name = "subsection "+subsection.id;
          subsection.steps = [];
          this.subsections.push(subsection);
          this.socket.emit('authoring',this.subsections,this.behaviors,this.settings);
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },

      }
    }
</script>

<style scoped>
  .list-group-item
  {
    overflow:hidden;
    position: relative;
    display: block;
    padding: 10px 15px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .head{
    font-family: Helvetica,serif;
  }
</style>
