import{b as d,l as i,a,e as c}from"./index.0e9b6764.js";class g{async getActiveAttendees(t){const e=await d.get("api/events/"+t+"/attendees");i.log("ATTENDING TO THIS EVENT",e.data);let n=a.activeAttending;n=e.data,a.activeAttending=n,await this.getMyAttending(),await this.findActiveAttending(t)}async getMyAttending(){const t=await d.get("account/attendees");i.log("ATTENDING",t.data);let e=a.attending;e=t.data,a.attending=e}async attend(t){const e=await d.post("api/attendees",{eventId:t});i.log("ATTENDING",e.data);let n=e.data;a.activeAttending=n,a.activeEvent=n.event,c.getActive(t),this.getActiveAttendees(t)}async notattend(t,e){const n=await d.delete("api/attendees/"+e);i.log("NOT ATTENDING",n.data),a.attending=a.attending.filter(s=>s.id!==e),a.activeAttending=a.activeAttending.filter(s=>s.id!==e),a.activeEvent=t,c.getActive(t),await this.getActiveAttendees(t),await this.findActiveAttending(t)}async notattendaccount(t,e){const n=await d.delete("api/attendees/"+e);i.log("NOT ATTENDING",n.data),a.attending=a.attending.filter(s=>s.id!==e),a.activeEvent=t,await this.getActiveAttendees(t),await this.findActiveAttending(t)}async findActiveAttending(t){let e=a.attending.find(n=>n.eventId===t);a.myActiveAttend=e,i.log("MY ATTENDING THIS EVENT",e)}}const o=new g;export{o as a};
