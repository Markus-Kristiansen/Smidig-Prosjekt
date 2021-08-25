<template>

        <tbody>
            <tr>
              <th scope="col">{{repair.user}}</th>
              <td>{{time}}</td>
              <td>{{repairString}}</td>
              <td>{{repair.repair.comment}}</td>
            </tr>
          </tbody>

</template>

<script>
export default {
    props: {
        username: String,
        repair: Object
    },
    computed: {
      time() {
        const time = new Date(this.repair.timestamp)
        return time.toUTCString()
      },
      repairString() {
        let s = '';
        if (this.repair.repair.led) { s += 'LED // '}
        if (this.repair.repair.solar) { s += 'SOLAR-ARRAY // '}
        if (this.repair.repair.power) { s += 'POWER-BUTTON // '}
        if (this.repair.repair.battery) { s += 'BATTERY'}
        return s
      }
    }
}
</script>