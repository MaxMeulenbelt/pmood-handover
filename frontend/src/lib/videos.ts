/* eslint-disable @typescript-eslint/no-var-requires */
import { AVPlaybackSource } from 'expo-av'

const p: AVPlaybackSource[] = [
  require('frontend/assets/Slots/videos/pp.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/pk.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/pc.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/pb.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/pw.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/p7.mp4') as AVPlaybackSource,
]

const k: AVPlaybackSource[] = [
  require('frontend/assets/Slots/videos/kp.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/kk.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/kc.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/kb.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/kw.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/k7.mp4') as AVPlaybackSource,
]

const c: AVPlaybackSource[] = [
  require('frontend/assets/Slots/videos/cp.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/ck.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/cc.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/cb.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/cw.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/c7.mp4') as AVPlaybackSource,
]

const b: AVPlaybackSource[] = [
  require('frontend/assets/Slots/videos/bp.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/bk.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/bc.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/bb.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/bw.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/b7.mp4') as AVPlaybackSource,
]

const w: AVPlaybackSource[] = [
  require('frontend/assets/Slots/videos/wp.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/wk.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/wc.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/wb.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/ww.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/w7.mp4') as AVPlaybackSource,
]

const s: AVPlaybackSource[] = [
  require('frontend/assets/Slots/videos/7p.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/7k.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/7c.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/7b.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/7w.mp4') as AVPlaybackSource,
  require('frontend/assets/Slots/videos/77.mp4') as AVPlaybackSource,
]

const videos = {
  plum: p,
  k,
  cherry: c,
  bar: b,
  watermelon: w,
  seven: s,
}
export default { videos }
