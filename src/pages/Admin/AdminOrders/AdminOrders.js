import React from 'react'
import TableTemplate from '../components/TableTemplate'
import './AdminOrders.css'

export default function AdminAllCustomers() {
  // DUMMY DATA 
  const customerData = [{
    "id": 1,
    "name": "Jacintha Bellow",
    "email": "jbellow0@hp.com",
    "phone": "922-620-8999"
  }, {
    "id": 2,
    "name": "Nadiya Aldridge",
    "email": "naldridge1@flavors.me",
    "phone": "360-626-1301"
  }, {
    "id": 3,
    "name": "Demetria Larne",
    "email": "dlarne2@plala.or.jp",
    "phone": "833-627-3019"
  }, {
    "id": 4,
    "name": "Lovell Pryn",
    "email": "lpryn3@imgur.com",
    "phone": "157-249-7068"
  }, {
    "id": 5,
    "name": "Henrietta Stollhofer",
    "email": "hstollhofer4@amazon.de",
    "phone": "269-614-2965"
  }, {
    "id": 6,
    "name": "Gayelord Eliez",
    "email": "geliez5@ted.com",
    "phone": "657-916-6604"
  }, {
    "id": 7,
    "name": "Elspeth Teasdale-Markie",
    "email": "eteasdalemarkie6@psu.edu",
    "phone": "825-547-7228"
  }, {
    "id": 8,
    "name": "Meryl Darbishire",
    "email": "mdarbishire7@alibaba.com",
    "phone": "196-364-9644"
  }, {
    "id": 9,
    "name": "Mada Eplett",
    "email": "meplett8@squidoo.com",
    "phone": "976-548-8838"
  }, {
    "id": 10,
    "name": "Ingeborg Riddich",
    "email": "iriddich9@qq.com",
    "phone": "785-192-7491"
  }, {
    "id": 11,
    "name": "Hewitt Schach",
    "email": "hschacha@redcross.org",
    "phone": "973-961-8134"
  }, {
    "id": 12,
    "name": "Rouvin Johnston",
    "email": "rjohnstonb@goo.gl",
    "phone": "457-529-5232"
  }, {
    "id": 13,
    "name": "Torrence Hlavac",
    "email": "thlavacc@acquirethisname.com",
    "phone": "986-670-4142"
  }, {
    "id": 14,
    "name": "Em Sor",
    "email": "esord@amazonaws.com",
    "phone": "681-618-6142"
  }, {
    "id": 15,
    "name": "Sammy Kenewel",
    "email": "skenewele@nytimes.com",
    "phone": "218-133-3168"
  }, {
    "id": 16,
    "name": "Danny Sturley",
    "email": "dsturleyf@bandcamp.com",
    "phone": "772-448-2995"
  }, {
    "id": 17,
    "name": "Keen Allenby",
    "email": "kallenbyg@hp.com",
    "phone": "713-692-5679"
  }, {
    "id": 18,
    "name": "Aleda Philliphs",
    "email": "aphilliphsh@bloomberg.com",
    "phone": "859-869-4855"
  }, {
    "id": 19,
    "name": "Eleni Weblin",
    "email": "eweblini@cbsnews.com",
    "phone": "402-407-4745"
  }, {
    "id": 20,
    "name": "Salome Ridgway",
    "email": "sridgwayj@jigsy.com",
    "phone": "525-524-6958"
  }, {
    "id": 21,
    "name": "Gertrud Castelow",
    "email": "gcastelowk@google.de",
    "phone": "407-922-0555"
  }, {
    "id": 22,
    "name": "Northrop Godon",
    "email": "ngodonl@dailymotion.com",
    "phone": "471-330-4764"
  }, {
    "id": 23,
    "name": "Gabriella Silber",
    "email": "gsilberm@disqus.com",
    "phone": "633-509-5899"
  }, {
    "id": 24,
    "name": "Berton Leggat",
    "email": "bleggatn@livejournal.com",
    "phone": "550-294-5947"
  }, {
    "id": 25,
    "name": "Orlando Dyball",
    "email": "odyballo@census.gov",
    "phone": "404-401-9278"
  }, {
    "id": 26,
    "name": "Mariette Helling",
    "email": "mhellingp@home.pl",
    "phone": "638-260-6785"
  }, {
    "id": 27,
    "name": "Maxim Agett",
    "email": "magettq@blogs.com",
    "phone": "107-944-4539"
  }, {
    "id": 28,
    "name": "Ezechiel Twort",
    "email": "etwortr@ox.ac.uk",
    "phone": "414-405-3161"
  }, {
    "id": 29,
    "name": "Lauren Breitling",
    "email": "lbreitlings@weibo.com",
    "phone": "908-241-0850"
  }, {
    "id": 30,
    "name": "Isidore Seares",
    "email": "isearest@123-reg.co.uk",
    "phone": "492-802-4776"
  }, {
    "id": 31,
    "name": "Ivette Maxworthy",
    "email": "imaxworthyu@tiny.cc",
    "phone": "274-582-3241"
  }, {
    "id": 32,
    "name": "Celine Chelam",
    "email": "cchelamv@telegraph.co.uk",
    "phone": "872-196-1784"
  }, {
    "id": 33,
    "name": "Berne Munro",
    "email": "bmunrow@odnoklassniki.ru",
    "phone": "879-102-1723"
  }, {
    "id": 34,
    "name": "Margarette Barter",
    "email": "mbarterx@icio.us",
    "phone": "225-551-3436"
  }, {
    "id": 35,
    "name": "Bondie MacKnockiter",
    "email": "bmacknockitery@list-manage.com",
    "phone": "943-510-8058"
  }, {
    "id": 36,
    "name": "Gilberto Hammand",
    "email": "ghammandz@auda.org.au",
    "phone": "835-647-2943"
  }, {
    "id": 37,
    "name": "Bidget Bryde",
    "email": "bbryde10@sourceforge.net",
    "phone": "414-630-3056"
  }, {
    "id": 38,
    "name": "Fair Ruggiero",
    "email": "fruggiero11@bravesites.com",
    "phone": "862-479-3813"
  }, {
    "id": 39,
    "name": "Allsun Rainforth",
    "email": "arainforth12@ucoz.ru",
    "phone": "360-455-4621"
  }, {
    "id": 40,
    "name": "Lavina Morby",
    "email": "lmorby13@simplemachines.org",
    "phone": "742-259-6084"
  }, {
    "id": 41,
    "name": "Nonah Bartlomiej",
    "email": "nbartlomiej14@ezinearticles.com",
    "phone": "204-264-2997"
  }, {
    "id": 42,
    "name": "Hannah Tubritt",
    "email": "htubritt15@patch.com",
    "phone": "202-763-1790"
  }, {
    "id": 43,
    "name": "Gretchen Besemer",
    "email": "gbesemer16@amazon.co.jp",
    "phone": "148-359-7882"
  }, {
    "id": 44,
    "name": "Magnum Spark",
    "email": "mspark17@kickstarter.com",
    "phone": "402-203-9399"
  }, {
    "id": 45,
    "name": "Regen Abramcik",
    "email": "rabramcik18@irs.gov",
    "phone": "229-227-8480"
  }, {
    "id": 46,
    "name": "Melody Boig",
    "email": "mboig19@so-net.ne.jp",
    "phone": "785-514-6230"
  }, {
    "id": 47,
    "name": "Mandi Sutter",
    "email": "msutter1a@skyrock.com",
    "phone": "827-807-4004"
  }, {
    "id": 48,
    "name": "Pattie Brookton",
    "email": "pbrookton1b@photobucket.com",
    "phone": "127-121-8734"
  }, {
    "id": 49,
    "name": "Moyra Belvard",
    "email": "mbelvard1c@timesonline.co.uk",
    "phone": "589-867-8930"
  }, {
    "id": 50,
    "name": "Ashlee Howley",
    "email": "ahowley1d@myspace.com",
    "phone": "721-810-9299"
  }, {
    "id": 51,
    "name": "Lorens Bramelt",
    "email": "lbramelt1e@umn.edu",
    "phone": "879-958-1988"
  }, {
    "id": 52,
    "name": "Sully Rioch",
    "email": "srioch1f@cafepress.com",
    "phone": "487-386-3377"
  }, {
    "id": 53,
    "name": "Skelly McAleese",
    "email": "smcaleese1g@w3.org",
    "phone": "175-755-7826"
  }, {
    "id": 54,
    "name": "Janeczka Walczak",
    "email": "jwalczak1h@hexun.com",
    "phone": "658-178-2592"
  }, {
    "id": 55,
    "name": "Jared Conibeer",
    "email": "jconibeer1i@netscape.com",
    "phone": "212-114-0324"
  }, {
    "id": 56,
    "name": "Ursola Iwanczyk",
    "email": "uiwanczyk1j@fda.gov",
    "phone": "212-569-0282"
  }, {
    "id": 57,
    "name": "Rosabella Wenzel",
    "email": "rwenzel1k@exblog.jp",
    "phone": "427-260-3908"
  }, {
    "id": 58,
    "name": "Brinn Pitt",
    "email": "bpitt1l@ftc.gov",
    "phone": "509-925-6261"
  }, {
    "id": 59,
    "name": "Maddalena Osburn",
    "email": "mosburn1m@163.com",
    "phone": "388-584-7366"
  }, {
    "id": 60,
    "name": "Antonella Dunning",
    "email": "adunning1n@mysql.com",
    "phone": "589-278-9092"
  }, {
    "id": 61,
    "name": "Sapphira Massey",
    "email": "smassey1o@hatena.ne.jp",
    "phone": "605-170-5350"
  }, {
    "id": 62,
    "name": "Shelly Ossulton",
    "email": "sossulton1p@biglobe.ne.jp",
    "phone": "217-680-5995"
  }, {
    "id": 63,
    "name": "Olia Annon",
    "email": "oannon1q@hc360.com",
    "phone": "519-173-9091"
  }, {
    "id": 64,
    "name": "Agnesse Goslin",
    "email": "agoslin1r@guardian.co.uk",
    "phone": "821-516-0776"
  }, {
    "id": 65,
    "name": "Cleon Brumen",
    "email": "cbrumen1s@pagesperso-orange.fr",
    "phone": "382-164-2790"
  }, {
    "id": 66,
    "name": "Mikey Mottini",
    "email": "mmottini1t@state.gov",
    "phone": "460-571-7532"
  }, {
    "id": 67,
    "name": "Ardys Mebes",
    "email": "amebes1u@princeton.edu",
    "phone": "523-266-6576"
  }, {
    "id": 68,
    "name": "Sherilyn Winchcum",
    "email": "swinchcum1v@symantec.com",
    "phone": "446-600-1276"
  }, {
    "id": 69,
    "name": "Nannette Bortoletti",
    "email": "nbortoletti1w@answers.com",
    "phone": "902-991-8336"
  }, {
    "id": 70,
    "name": "Malachi Fley",
    "email": "mfley1x@g.co",
    "phone": "916-188-3980"
  }, {
    "id": 71,
    "name": "Linoel Bernot",
    "email": "lbernot1y@statcounter.com",
    "phone": "944-576-6330"
  }, {
    "id": 72,
    "name": "Josephina Norcliff",
    "email": "jnorcliff1z@nsw.gov.au",
    "phone": "519-886-5141"
  }, {
    "id": 73,
    "name": "Tybi Vondrys",
    "email": "tvondrys20@drupal.org",
    "phone": "336-903-7585"
  }, {
    "id": 74,
    "name": "Bernette Sargeant",
    "email": "bsargeant21@unesco.org",
    "phone": "139-851-6557"
  }, {
    "id": 75,
    "name": "Mariellen Senyard",
    "email": "msenyard22@omniture.com",
    "phone": "824-566-1019"
  }, {
    "id": 76,
    "name": "Marijo Crickett",
    "email": "mcrickett23@google.co.jp",
    "phone": "350-297-7122"
  }, {
    "id": 77,
    "name": "Luther Ayerst",
    "email": "layerst24@constantcontact.com",
    "phone": "768-891-7239"
  }, {
    "id": 78,
    "name": "Tann Rhubottom",
    "email": "trhubottom25@blogger.com",
    "phone": "210-764-7129"
  }, {
    "id": 79,
    "name": "Shalom Denyukin",
    "email": "sdenyukin26@irs.gov",
    "phone": "661-639-3916"
  }, {
    "id": 80,
    "name": "Rubia Wealthall",
    "email": "rwealthall27@canalblog.com",
    "phone": "317-121-9876"
  }, {
    "id": 81,
    "name": "Jesus Valentin",
    "email": "jvalentin28@nps.gov",
    "phone": "317-559-9415"
  }, {
    "id": 82,
    "name": "Donella Hardie",
    "email": "dhardie29@who.int",
    "phone": "681-342-0308"
  }, {
    "id": 83,
    "name": "Ericha Barthropp",
    "email": "ebarthropp2a@ning.com",
    "phone": "216-676-0372"
  }, {
    "id": 84,
    "name": "Yuma Beadel",
    "email": "ybeadel2b@boston.com",
    "phone": "915-448-5374"
  }, {
    "id": 85,
    "name": "Neils Rainville",
    "email": "nrainville2c@statcounter.com",
    "phone": "405-337-4671"
  }, {
    "id": 86,
    "name": "Millicent Sumpter",
    "email": "msumpter2d@com.com",
    "phone": "585-590-3570"
  }, {
    "id": 87,
    "name": "Gaston Membry",
    "email": "gmembry2e@scribd.com",
    "phone": "697-438-5188"
  }, {
    "id": 88,
    "name": "Patricio Thebeau",
    "email": "pthebeau2f@123-reg.co.uk",
    "phone": "630-326-9224"
  }, {
    "id": 89,
    "name": "Geoffrey Braysher",
    "email": "gbraysher2g@unc.edu",
    "phone": "742-365-3020"
  }, {
    "id": 90,
    "name": "Leeanne Carlile",
    "email": "lcarlile2h@fastcompany.com",
    "phone": "365-354-8867"
  }, {
    "id": 91,
    "name": "Meagan Rolfini",
    "email": "mrolfini2i@wp.com",
    "phone": "331-961-8437"
  }, {
    "id": 92,
    "name": "Verne Rickeard",
    "email": "vrickeard2j@blogger.com",
    "phone": "655-396-6952"
  }, {
    "id": 93,
    "name": "Edee Bodocs",
    "email": "ebodocs2k@zimbio.com",
    "phone": "106-535-4211"
  }, {
    "id": 94,
    "name": "Antonius Kornalik",
    "email": "akornalik2l@typepad.com",
    "phone": "929-894-8221"
  }, {
    "id": 95,
    "name": "Sigfried Kubyszek",
    "email": "skubyszek2m@printfriendly.com",
    "phone": "114-578-5808"
  }, {
    "id": 96,
    "name": "Marlene Desseine",
    "email": "mdesseine2n@sohu.com",
    "phone": "636-109-2188"
  }, {
    "id": 97,
    "name": "Lisetta Gubbins",
    "email": "lgubbins2o@sina.com.cn",
    "phone": "114-543-6790"
  }, {
    "id": 98,
    "name": "Ofelia Abrahamson",
    "email": "oabrahamson2p@unesco.org",
    "phone": "758-262-1573"
  }, {
    "id": 99,
    "name": "Zaria Sutherland",
    "email": "zsutherland2q@arizona.edu",
    "phone": "528-263-9665"
  }, {
    "id": 100,
    "name": "Kizzie McCulloch",
    "email": "kmcculloch2r@pagesperso-orange.fr",
    "phone": "814-866-4545"
  }]

  return (
    <div className="ListContainer">
      <h1>All Customers</h1>

      <TableTemplate
        columns={[
          { id: 'id', label: 'ID', minWidth: 170 },
          { id: 'name', label: 'Name', minWidth: 170 },
          { id: 'email', label: 'Email', minWidth: 170 },
          { id: 'phone', label: 'Phone', minWidth: 170 },
        ]}
        rows={customerData}
      />
    </div>
  )
}
