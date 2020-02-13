<template>
  <q-page class="q-pa-md">
    <div class="row items-start q-gutter-md">
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">Instrument:</div>
          <div class="text-subtitle2">
            <q-btn-dropdown split class="glossy" color="teal" :label="instr">
              <q-list>
                <q-item clickable v-close-popup @click="onItemClick('49i')">
                  <q-item-section>
                    <q-item-label>49i</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick('48i')">
                  <q-item-section>
                    <q-item-label>48i</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick('BAM')">
                  <q-item-section>
                    <q-item-label>BAM</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </q-card-section>

        <q-card-section>
          <q-expansion-item expand-separator icon="settings" :label="instr">
            <q-card>
              <q-card-section>
                <q-editor
                  v-model="conn_cfg"
                  flat
                  content-class="bg-amber-3 text-black"
                  toolbar-text-color="black"
                  toolbar-toggle-color="yellow-8"
                  toolbar-bg="primary"
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn flat>Config</q-btn>
          <q-btn flat @click='onConnect()'>Connect</q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card bg-info">
        <q-card-section>
          <div class="text-h6">Data:</div>
          <div class="text-subtitle2">
            <div style="width: 100%; max-width: 400px">
              <q-chat-message v-for="(item, index) in rawdata" :key="index" :label=item sent />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'PageIndex',

  data () {
    return {
      instr: 'Select Instrument...',
      conn_cfg: `[TE49i]
Serial=1
Port=5
BaudRate=9600
data_count=12
`,
      rawdata: []
    }
  },

  methods: {
    onItemClick (instr) {
      // console.log('Clicked on an Item')
      this.instr = instr
    },
    onConnect () {
      let ioClient = io.connect('http://localhost:8081')
      ioClient.on('time', msg => {
        this.rawdata.push(msg)
        console.log(this.rawdata)
      })
    }
  }
}
</script>
