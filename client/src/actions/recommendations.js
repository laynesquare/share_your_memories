import * as api from '../api/recommendations';
import {
  GET_RECOMMEND_VIDS,
  START_LOADING_RECOMMENDATIONS,
  END_LOADING_RECOMMENDATIONS,
} from '../constants/actionTypes';

// const data = {
//   kind: 'youtube#searchListResponse',
//   etag: 'SNfohI5jdl_R0KCn0HBenihRSHM',
//   nextPageToken: 'CBkQAA',
//   regionCode: 'TW',
//   pageInfo: {
//     totalResults: 1000000,
//     resultsPerPage: 25,
//   },
//   items: [
//     {
//       kind: 'youtube#searchResult',
//       etag: '-ZwAt3kMcd_5oyNiQdaGX_D9Zrc',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'X9wqR1XhQ3o',
//       },
//       snippet: {
//         publishedAt: '2008-05-22T10:22:08Z',
//         channelId: 'UCuWz84H3yBOzDPH3ggBo4kg',
//         title: 'Starsailor - Four To The Floor (Thin White Duke Mix)',
//         description: 'Starsailor - Four To The Floor (Thin White Duke Mix)',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/X9wqR1XhQ3o/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/X9wqR1XhQ3o/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/X9wqR1XhQ3o/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'MusicTV',
//         liveBroadcastContent: 'none',
//         publishTime: '2008-05-22T10:22:08Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'GjVTYfVabMjAqtqHPP7OV6COwJo',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'ydLcs4VrjZQ',
//       },
//       snippet: {
//         publishedAt: '2013-04-07T19:22:10Z',
//         channelId: 'UCF299tD6KF4FRCdNEkV0fwA',
//         title: 'David Bowie- Young Americans',
//         description:
//           'Bowie performing on Dick Cavett Show [4 of December 1974]',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/ydLcs4VrjZQ/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/ydLcs4VrjZQ/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/ydLcs4VrjZQ/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Kate King',
//         liveBroadcastContent: 'none',
//         publishTime: '2013-04-07T19:22:10Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'Kn2n8n2HqZVJqvutDQrP1NxHSl8',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'ZpIhsGg2SJ0',
//       },
//       snippet: {
//         publishedAt: '2017-02-09T16:53:28Z',
//         channelId: 'UCvY1eVE6lTebXsdFbbXUtkQ',
//         title: 'Station to Station (2016 Remaster)',
//         description:
//           'Provided to YouTube by Parlophone UK Station to Station (2016 Remaster) · David Bowie Station to Station ℗ 1976, 2016 ...',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/ZpIhsGg2SJ0/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/ZpIhsGg2SJ0/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/ZpIhsGg2SJ0/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'David Bowie - Topic',
//         liveBroadcastContent: 'none',
//         publishTime: '2017-02-09T16:53:28Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'ItadHznd6mpJXihfFbSiJrkVrhE',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'RSheh22KGQg',
//       },
//       snippet: {
//         publishedAt: '2007-11-18T05:22:11Z',
//         channelId: 'UCIeBegy2J5kuYBl5nXQXtRQ',
//         title: 'Mr. Brightside (Jacques Lu Cont&#39;s Thin White Duke Remix)',
//         description:
//           '"Mr. Brightside (Jacques Lu Cont\'s Thin White Duke Remix)" by The Killers from the album Sawdust And it\'s all in my head But ...',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/RSheh22KGQg/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/RSheh22KGQg/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/RSheh22KGQg/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'TheNewCancir',
//         liveBroadcastContent: 'none',
//         publishTime: '2007-11-18T05:22:11Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'ADGaalqYr1Mc95bBC4jI51OrFyk',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'ofeSZJJ_fxQ',
//       },
//       snippet: {
//         publishedAt: '2018-04-12T19:31:58Z',
//         channelId: 'UCXkNod_JcH7PleOjwK_8rYQ',
//         title: 'The Thin White Duke: David Bowie&#39;s Darkest Character',
//         description:
//           'Watch this video ad-free on Nebula: https://nebula.app/videos/polyphonic-the-thin-white-duke-david-bowie-s-darkest-character ...',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/ofeSZJJ_fxQ/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/ofeSZJJ_fxQ/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/ofeSZJJ_fxQ/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Polyphonic',
//         liveBroadcastContent: 'none',
//         publishTime: '2018-04-12T19:31:58Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: '23fbzH5Jg1ycEzW1eRPkWVDEQSQ',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'E-00RvfVx3o',
//       },
//       snippet: {
//         publishedAt: '2007-09-29T08:44:27Z',
//         channelId: 'UC-XwG-2o4SNa6oDmp7GLERw',
//         title: 'Seal - Amazing (Thin White Duke Remix)',
//         description: 'Amazing (Thin White Duke Remix) by Seal.',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/E-00RvfVx3o/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/E-00RvfVx3o/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/E-00RvfVx3o/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Libramatic',
//         liveBroadcastContent: 'none',
//         publishTime: '2007-09-29T08:44:27Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: '35YBWerofFzOxwTdvS_Pla2_9-U',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'rOZ0vp19kVA',
//       },
//       snippet: {
//         publishedAt: '2017-01-23T20:09:40Z',
//         channelId: 'UCEIzPfMHogIP5ihDhTf5v1g',
//         title: 'Four to the Floor (Thin White Duke Mix)',
//         description:
//           'Provided to YouTube by Parlophone UK Four to the Floor (Thin White Duke Mix) · Starsailor Four To The Floor ℗ 2003 ...',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/rOZ0vp19kVA/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/rOZ0vp19kVA/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/rOZ0vp19kVA/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Starsailor - Topic',
//         liveBroadcastContent: 'none',
//         publishTime: '2017-01-23T20:09:40Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'YjkSCzqGOy0ihtboIGIUrn_8uT4',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'XAj2iX9xqCo',
//       },
//       snippet: {
//         publishedAt: '2016-07-01T13:59:57Z',
//         channelId: 'UC6-GXe1clYKF8q4juAXPZIQ',
//         title: 'David Bowie • Station to Station • Live 1976',
//         description:
//           "The video I edited in 2016, combining Phillipe Bergeron's 1976 Montreal Forum footage, cut to Station to Station from the Live ...",
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/XAj2iX9xqCo/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/XAj2iX9xqCo/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/XAj2iX9xqCo/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Nacho Video',
//         liveBroadcastContent: 'none',
//         publishTime: '2016-07-01T13:59:57Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'zQS6PRQLrfmb0ZZxP5kiUS1IT0U',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'd9WHUTKMD8k',
//       },
//       snippet: {
//         publishedAt: '2017-01-23T20:17:10Z',
//         channelId: 'UCEIzPfMHogIP5ihDhTf5v1g',
//         title: 'Four to the Floor (Thin White Duke Mix) (Short Version)',
//         description:
//           'Provided to YouTube by Parlophone UK Four to the Floor (Thin White Duke Mix) (Short Version) · Starsailor Four To The Floor ...',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/d9WHUTKMD8k/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/d9WHUTKMD8k/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/d9WHUTKMD8k/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Starsailor - Topic',
//         liveBroadcastContent: 'none',
//         publishTime: '2017-01-23T20:17:10Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'r00kskXZCMDH7d2g_pZSrt2usWI',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'KrC6EQjzQy0',
//       },
//       snippet: {
//         publishedAt: '2012-03-20T14:56:15Z',
//         channelId: 'UCYvmuw-JtVrTZQ-7Y4kd63Q',
//         title:
//           'Katy Perry - &quot;Part of Me (Jacques Lu Cont&#39;s Thin White Duke Remix)&quot;',
//         description:
//           'Jacques Lu Cont\'s Thin White Duke remix of Katy Perry\'s "Part of Me". Download on iTunes: http://goo.gl/ZwRRp.',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/KrC6EQjzQy0/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/KrC6EQjzQy0/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/KrC6EQjzQy0/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Katy Perry',
//         liveBroadcastContent: 'none',
//         publishTime: '2012-03-20T14:56:15Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'Qf1rTdJpw7hyX6IWGPI03952an0',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'RSSf3k4UU64',
//       },
//       snippet: {
//         publishedAt: '2016-01-11T21:17:16Z',
//         channelId: 'UCTOX2GDXc9C-sDeoAykNjsw',
//         title: 'David Bowie Interview on Dick Cavett - 1974',
//         description: '',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/RSSf3k4UU64/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/RSSf3k4UU64/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/RSSf3k4UU64/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'RetroSoup',
//         liveBroadcastContent: 'none',
//         publishTime: '2016-01-11T21:17:16Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'LC4bf1tFF5Oc-IpZaTsTKQljl2o',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'EyUrH_IOgqI',
//       },
//       snippet: {
//         publishedAt: '2007-10-17T14:50:39Z',
//         channelId: 'UC98YfUWYJt12N2wrh-ijBVw',
//         title:
//           'The Killers - Mr Brightside (Jacques Lu Cont&#39;s Thin White Duke Mix)',
//         description:
//           "Mr.Brightside (Jacques Lu Cont's Thin White Duke Mix) - Track 17 on Sawdust (out Nov 13th)",
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/EyUrH_IOgqI/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/EyUrH_IOgqI/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/EyUrH_IOgqI/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Chloe Dorrington',
//         liveBroadcastContent: 'none',
//         publishTime: '2007-10-17T14:50:39Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'OlKdrBAeJlPbACQP2T-2r9N7o3g',
//       id: {
//         kind: 'youtube#video',
//         videoId: '7J3JVkcVDXs',
//       },
//       snippet: {
//         publishedAt: '2011-03-16T20:05:38Z',
//         channelId: 'UCQBe5f0yTnmyFiYCi7slU-A',
//         title: 'Royksopp - What Else is There (Thin White Duke Remix) (HD)',
//         description:
//           'Royksopp - What Else is There_ (Thin White Duke Remix) extendet version.',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/7J3JVkcVDXs/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/7J3JVkcVDXs/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/7J3JVkcVDXs/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Fanne 91',
//         liveBroadcastContent: 'none',
//         publishTime: '2011-03-16T20:05:38Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'ZqxcDsl6B1Ew6a-7AayW2ZZyynY',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'MSpZ8wcJTXc',
//       },
//       snippet: {
//         publishedAt: '2009-05-13T07:06:36Z',
//         channelId: 'UCiAaHoAZfVVtT4_TJaPe7eg',
//         title:
//           'Depeche Mode -  Wrong (Thin White Duke Remix) Steven Wayne Video Edit',
//         description:
//           'Depeche Mode - Wrong (Thin White Duke Remix) - Video Edit by Steven Wayne - jupiter8media.com.',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/MSpZ8wcJTXc/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/MSpZ8wcJTXc/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/MSpZ8wcJTXc/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Steven Wayne',
//         liveBroadcastContent: 'none',
//         publishTime: '2009-05-13T07:06:36Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'TvUmIxoNzqByBEtWD8QzxKU69AA',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'fERjyMImAOA',
//       },
//       snippet: {
//         publishedAt: '2012-12-03T12:55:16Z',
//         channelId: 'UCqbd_P9hQhlEVb7h5-fincQ',
//         title:
//           'Victoria&#39;s Secret Fashion Show 2006 (When You Were Young) [AUDIO]',
//         description:
//           "Victoria's Secret Fashion Show 2006 Segment 3: Come Fly With Me Music: The Killers: When You Were Young (Thin White Duke ...",
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/fERjyMImAOA/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/fERjyMImAOA/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/fERjyMImAOA/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Alich Darl',
//         liveBroadcastContent: 'none',
//         publishTime: '2012-12-03T12:55:16Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'gsc65YwYMsd0I1XjNGNTfx03Opg',
//       id: {
//         kind: 'youtube#video',
//         videoId: '6meL-TaiP30',
//       },
//       snippet: {
//         publishedAt: '2012-05-16T01:30:57Z',
//         channelId: 'UC9XuhKkT2MiOAzL_NZEA9pA',
//         title:
//           'The Killers - Mr Brightside (Jacques Lu Cont&#39;s Thin White Duke Remix)',
//         description:
//           'Probably the best remix of any song by The Killers. Ever.',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/6meL-TaiP30/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/6meL-TaiP30/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/6meL-TaiP30/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Hejsanb',
//         liveBroadcastContent: 'none',
//         publishTime: '2012-05-16T01:30:57Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: '_9Wt92zfEq8iGO-FvPBps45jV8k',
//       id: {
//         kind: 'youtube#video',
//         videoId: '1UgWB2zEJuE',
//       },
//       snippet: {
//         publishedAt: '2019-06-06T10:05:58Z',
//         channelId: 'UCneQ7UWyu9USLDgMya6T7IA',
//         title:
//           'Mr. Brightside (Jacques Lu Cont&#39;s Thin White Duke Radio Remix)',
//         description:
//           "Provided to YouTube by Universal Music Group Mr. Brightside (Jacques Lu Cont's Thin White Duke Radio Remix) · The Killers Mr.",
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/1UgWB2zEJuE/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/1UgWB2zEJuE/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/1UgWB2zEJuE/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'The Killers - Topic',
//         liveBroadcastContent: 'none',
//         publishTime: '2019-06-06T10:05:58Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'spKH_I38eIprxyVBP6F3I1evUTg',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'BtoCOa0HnIw',
//       },
//       snippet: {
//         publishedAt: '2009-06-07T13:45:10Z',
//         channelId: 'UC0JPFb40o4YhuUIAawRjkLA',
//         title: 'Seal - Amazing (thin white duke edit)',
//         description: 'Amazing ...',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/BtoCOa0HnIw/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/BtoCOa0HnIw/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/BtoCOa0HnIw/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Nielschh',
//         liveBroadcastContent: 'none',
//         publishTime: '2009-06-07T13:45:10Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: '5ml2h9jjl9WmFdQsp3CBhGiV3t8',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'LkxJuSrx4_k',
//       },
//       snippet: {
//         publishedAt: '2009-04-06T19:35:36Z',
//         channelId: 'UC47172_yWVKl1HI4CCOorZQ',
//         title: 'Coldplay - Talk (Thin White Duke Remix)',
//         description:
//           'I wanted to share this amazing remix with fellow fans :) I do not own any rights to this song~! Enjoy~',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/LkxJuSrx4_k/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/LkxJuSrx4_k/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/LkxJuSrx4_k/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Jenny E',
//         liveBroadcastContent: 'none',
//         publishTime: '2009-04-06T19:35:36Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: '6Retd80MljHC0wgSO5D7PciHQ-k',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'v-gM4yEV-Vs',
//       },
//       snippet: {
//         publishedAt: '2010-08-17T10:50:37Z',
//         channelId: 'UCGqWEah-gL1zGouA2PADBdg',
//         title: 'Seal - Amazing (Thin White Duke remix)',
//         description: 'Seal - Amazing (Thin White Duke remix)',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/v-gM4yEV-Vs/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/v-gM4yEV-Vs/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/v-gM4yEV-Vs/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'enAPRIETOs',
//         liveBroadcastContent: 'none',
//         publishTime: '2010-08-17T10:50:37Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'RW8ScJNIIcdMnJK8hL-rjX_aNUk',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'GPAhhoND6rI',
//       },
//       snippet: {
//         publishedAt: '2009-06-20T20:54:03Z',
//         channelId: 'UCJVVhW2Di1zl-C56_gU1LXA',
//         title: 'The Thin White Duke',
//         description:
//           'In diesem Video habe ich ein paar Bilder von David Bowies Kunstfigur, dem "Thin White Duke" zusammengestellt. Das Lied ist ...',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/GPAhhoND6rI/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/GPAhhoND6rI/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/GPAhhoND6rI/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'DiamondDogsMoonage',
//         liveBroadcastContent: 'none',
//         publishTime: '2009-06-20T20:54:03Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'dpfIruPULrgzRu7vI9hssn25Aro',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'Xsoo9Q0Fmlk',
//       },
//       snippet: {
//         publishedAt: '2008-11-19T21:41:58Z',
//         channelId: 'UCE4pqN7v8p6doVf8W7XSL_Q',
//         title: 'Killers - Human (Thin White Duke Remix) + DOWNLOAD LINK',
//         description:
//           'Remix of the Killers - Human by Thin White Duke . (not bowie) AMAZING REMIX! Enjoy! :) DOWNLOAD HERE ...',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/Xsoo9Q0Fmlk/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/Xsoo9Q0Fmlk/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/Xsoo9Q0Fmlk/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'dazlia2',
//         liveBroadcastContent: 'none',
//         publishTime: '2008-11-19T21:41:58Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: '8Sh24hbxKDDXYJ61nOySdpNDNjA',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'R6DyPsCXxIk',
//       },
//       snippet: {
//         publishedAt: '2019-06-06T10:06:03Z',
//         channelId: 'UCneQ7UWyu9USLDgMya6T7IA',
//         title: 'Mr. Brightside (Jacques Lu Cont&#39;s Thin White Duke Mix)',
//         description:
//           "Provided to YouTube by Universal Music Group Mr. Brightside (Jacques Lu Cont's Thin White Duke Mix) · The Killers Mr.",
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/R6DyPsCXxIk/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/R6DyPsCXxIk/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/R6DyPsCXxIk/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'The Killers - Topic',
//         liveBroadcastContent: 'none',
//         publishTime: '2019-06-06T10:06:03Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: 'DqlVrCnGIsbsxMGmztuC_FeRg-8',
//       id: {
//         kind: 'youtube#video',
//         videoId: 'xvXXanmPiHA',
//       },
//       snippet: {
//         publishedAt: '2011-03-08T19:24:38Z',
//         channelId: 'UCfG5zhs0-7LUJluWM-DxFgA',
//         title: 'The Killers - Mr. Brightside (Thin White Duke Remix)',
//         description:
//           'The Killers - Mr. Brightside (Thin White Duke Remix). Album: Limited Edition 7-Inch Box Set Enjoy! ;)',
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/xvXXanmPiHA/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/xvXXanmPiHA/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/xvXXanmPiHA/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'CainReen',
//         liveBroadcastContent: 'none',
//         publishTime: '2011-03-08T19:24:38Z',
//       },
//     },
//     {
//       kind: 'youtube#searchResult',
//       etag: '_C3pdcpdbJWyeDkH1vAgkRdRCUw',
//       id: {
//         kind: 'youtube#video',
//         videoId: '65KNQOe6k3o',
//       },
//       snippet: {
//         publishedAt: '2010-08-31T05:19:41Z',
//         channelId: 'UCujxpy3HifLllr9azE9tPgg',
//         title:
//           'The Killers - Mr Brightside (Jacques Lu Cont&#39;s Thin White Duke Remix)',
//         description:
//           "The Killers - Mr Brightside (Jacques Lu Cont's Thin White Duke Remix) 12 inch http://www.youtube.com/watch?v=pwjzuQBvcHE.",
//         thumbnails: {
//           default: {
//             url: 'https://i.ytimg.com/vi/65KNQOe6k3o/default.jpg',
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: 'https://i.ytimg.com/vi/65KNQOe6k3o/mqdefault.jpg',
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: 'https://i.ytimg.com/vi/65KNQOe6k3o/hqdefault.jpg',
//             width: 480,
//             height: 360,
//           },
//         },
//         channelTitle: 'Bombellyagfatty',
//         liveBroadcastContent: 'none',
//         publishTime: '2010-08-31T05:19:41Z',
//       },
//     },
//   ],
// };

export const getRecommendedVids = (tagName) => async (dispatch) => {
  dispatch({ type: START_LOADING_RECOMMENDATIONS });
  const { data } = await api.getRecommendedVids(tagName);
  console.log(data.items);
  dispatch({ type: GET_RECOMMEND_VIDS, payload: data.items });
  dispatch({ type: END_LOADING_RECOMMENDATIONS });
  try {
  } catch (error) {
    console.log(error);
  }
};
