import { createRouter, createWebHistory } from 'vue-router'
import {authRef} from '../firebase/config'
import Home from '../views/Home.vue'
import SergiListesi from '../views/home/SergiListesi'
import SergiGez from '../views/home/SergiGez'
import Admin from '../views/admin/Admin'
import Profil from '../views/admin/Profil'
import Mesajlar from '../views/admin/Mesajlar'
import Yonetim from '../views/admin/Yonetim'
import SergiOlustur from '../views/admin/SergiOlustur'
import ResimEkle from '../views/admin/ResimEkle'

import getYetki from '@/composables/getYetki'



const authKontrol=(to,from,next)=>{
  let kullanici=authRef.currentUser;

  if(!kullanici){
    next({name:'SergiListesi'})
  }else{
    next()
  }
}

const adminKontrol=async (to,from,next)=>{

  let kullanici=authRef.currentUser;
  const {yetki}=await getYetki(kullanici.uid);

  if(yetki.value!='admin'){
    next({name:'Profil'})
  }else{
    next()
  }

}


const yetkiliKontrol=async (to,from,next)=>{

  let kullanici=authRef.currentUser;
  const {yetki}=await getYetki(kullanici.uid);

  if(yetki.value=="admin" || yetki.value=="yetkili"){
    next()
  }else{
    next({name:'Profil'})
  }

}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/sergi-listesi',
        name: 'SergiListesi',
        component: SergiListesi,
      },
      {
        path: '/sergi-gez/:sergiId',
        name: 'SergiGez',
        component: SergiGez,
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children:[
      {
        path: '/profil',
        name: 'Profil',
        component: Profil,
      },
      {
        path: '/mesajlar',
        name: 'Mesajlar',
        component: Mesajlar,
        beforeEnter:adminKontrol
      },
      {
        path: '/yonetim',
        name: 'Yonetim',
        component: Yonetim,
        beforeEnter:adminKontrol
      },
      {
        path: '/sergi-olustur',
        name: 'SergiOlustur',
        component: SergiOlustur,
        beforeEnter:yetkiliKontrol
      },
      {
        path: '/resim-ekle',
        name: 'ResimEkle',
        component: ResimEkle,
        beforeEnter:yetkiliKontrol
      }
    ],
    beforeEnter: authKontrol
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
