const STRATEGY_LEVELS={"easy":{"label":"Mudah","desc":"2 keputusan beruntun. Fokus melihat konsekuensi langsung sebelum memilih langkah pertama.","steps":2},"medium":{"label":"Sedang","desc":"3 keputusan beruntun. Kondisi berubah di tengah jalan dan kamu harus menjaga tujuan tetap tercapai.","steps":3},"hard":{"label":"Susah","desc":"4 keputusan beruntun. Ada trade-off, respons pihak lain, dan keputusan awal yang bisa mempersempit pilihanmu.","steps":4}};
const STRATEGY_SCENARIOS=[{"id":"st-e01","level":"easy","title":"Meeting & Printer","category":"Perencanaan Waktu","objective":"Tiba di meeting pukul 15.00 dengan dokumen sudah tercetak.","start":"s1","nodes":{"s1":{"state":"Sekarang 13.45. Perjalanan ke lokasi meeting 30 menit. Cetak dokumen butuh 20 menit dan antrean printer kadang 10–15 menit.","prompt":"Apa langkah pertamamu?","choices":[{"text":"Cetak sekarang, lalu berangkat segera setelah selesai.","next":"s2","consequence":"Printer ternyata antre 10 menit, tetapi kamu masih punya buffer.","scores":[95,92,85,88],"best":true,"analysis":"Kamu membeli buffer sebelum risiko muncul dan menjaga opsi tetap terbuka."},{"text":"Tunggu sampai 14.10 untuk memastikan file benar-benar final.","next":"s2","consequence":"File tidak berubah, tetapi saat mulai mencetak antrean sudah 15 menit.","scores":[55,42,65,72],"best":false,"analysis":"Menunggu mengurangi risiko revisi, tetapi mengorbankan buffer terlalu besar."},{"text":"Berangkat sekarang dan cari tempat print dekat lokasi.","next":"s2","consequence":"Kamu tiba dekat lokasi lebih cepat, tetapi tempat print terdekat sedang ramai.","scores":[72,58,70,64],"best":false,"analysis":"Kamu mengurangi risiko perjalanan tetapi memindahkan risiko ke tempat print yang belum pasti."}]},"s2":{"state":"Sekarang 14.20. Jalan menuju lokasi mulai macet; estimasi perjalanan naik menjadi 40 menit.","prompt":"Apa keputusan berikutnya?","choices":[{"text":"Berangkat begitu dokumen siap dan jangan tambah urusan lain.","next":null,"consequence":"Kamu tiba dengan buffer tipis tetapi sebelum meeting dimulai.","scores":[95,94,90,92],"best":true,"analysis":"Saat uncertainty naik, menjaga fokus pada critical path adalah pilihan paling robust."},{"text":"Selesaikan satu urusan kecil dulu karena hanya sekitar 10 menit.","next":null,"consequence":"Urusan kecil molor dan hampir menghabiskan buffer.","scores":[48,35,55,62],"best":false,"analysis":"Kamu memakai buffer justru ketika ketidakpastian perjalanan membesar."},{"text":"Tunggu macet turun 10 menit baru berangkat.","next":null,"consequence":"Macet tidak turun dan waktu tersisa berkurang.","scores":[40,38,50,45],"best":false,"analysis":"Menunggu tanpa evidence bahwa kondisi akan membaik hanya menambah risiko."}]}}},{"id":"st-e02","level":"easy","title":"Stok Menjelang Weekend","category":"Inventory","objective":"Menjaga produk tersedia tanpa overstock berlebihan.","start":"s1","nodes":{"s1":{"state":"Stok tersisa 34 unit. Penjualan normal 7 unit/hari. Weekend dua hari lagi dan demand biasanya naik 40%. Restock butuh 4 hari.","prompt":"Apa keputusan pertamamu?","choices":[{"text":"Pesan restock hari ini berdasarkan demand normal plus kenaikan weekend.","next":"s2","consequence":"Supplier menerima order tetapi mengingatkan kapasitas pengiriman sedang padat.","scores":[94,90,84,88],"best":true,"analysis":"Kamu bereaksi sebelum stok kritis dan memasukkan pola demand ke keputusan."},{"text":"Tunggu satu hari untuk melihat penjualan aktual.","next":"s2","consequence":"Hari ini terjual 9 unit dan stok turun lebih cepat dari rata-rata.","scores":[60,48,72,76],"best":false,"analysis":"Data tambahan berguna, tetapi lead time membuat biaya menunggu cukup besar."},{"text":"Pesan dua kali kebutuhan normal agar benar-benar aman.","next":"s2","consequence":"Supplier siap memenuhi jumlah besar, tetapi kas inventory terkunci lebih banyak.","scores":[70,62,65,42],"best":false,"analysis":"Kamu menurunkan stockout risk dengan menciptakan overstock dan cash risk."}]},"s2":{"state":"Supplier memberi kabar lead time kemungkinan mundur satu hari karena overload logistik.","prompt":"Apa respons berikutnya?","choices":[{"text":"Konfirmasi order dan prioritaskan SKU paling cepat bergerak jika jumlah harus dipangkas.","next":null,"consequence":"Produk utama mendapat alokasi lebih dulu saat kapasitas supplier terbatas.","scores":[94,92,92,87],"best":true,"analysis":"Kamu melindungi bagian inventory yang paling bernilai saat bottleneck muncul."},{"text":"Pertahankan semua SKU dalam jumlah yang sama.","next":null,"consequence":"Sebagian kapasitas jatuh ke SKU lambat saat SKU cepat justru lebih berisiko habis.","scores":[62,60,58,55],"best":false,"analysis":"Alokasi rata terlihat aman tetapi tidak mengikuti demand yang sebenarnya."},{"text":"Batalkan order dan cari supplier lain terlebih dahulu.","next":null,"consequence":"Kamu kehilangan posisi antrean sementara supplier alternatif belum pasti lebih cepat.","scores":[52,44,58,46],"best":false,"analysis":"Mengganti jalur sebelum alternatif terverifikasi membuat posisi makin rapuh."}]}}},{"id":"st-e03","level":"easy","title":"File Customer Menjelang Cut-off","category":"Deadline","objective":"Mengejar pengiriman hari ini tanpa mengorbankan validasi file.","start":"s1","nodes":{"s1":{"state":"Cut-off produksi pukul 14.00. Sekarang 12.50. Customer belum mengirim file final; pengecekan butuh 20 menit dan produksi 45 menit.","prompt":"Apa langkah pertamamu?","choices":[{"text":"Hubungi customer sekarang dan beri deadline internal 13.20 untuk file final.","next":"s2","consequence":"Customer merespons dan menjanjikan file pukul 13.15.","scores":[94,92,85,90],"best":true,"analysis":"Kamu membuat checkpoint sebelum deadline eksternal menjadi kritis."},{"text":"Tunggu sampai 13.30 karena cut-off masih cukup lama.","next":"s2","consequence":"Customer baru mengirim pukul 13.32.","scores":[45,35,55,70],"best":false,"analysis":"Kamu membiarkan hampir seluruh buffer habis sebelum bertindak."},{"text":"Masukkan file terakhir yang ada ke produksi agar tidak terlambat.","next":"s2","consequence":"Produksi bisa mulai, tetapi file itu belum disetujui final.","scores":[48,28,52,82],"best":false,"analysis":"Cepat bukan berarti aman; kamu menukar deadline risk dengan risiko salah produksi."}]},"s2":{"state":"File final masuk 13.18, tetapi bleed belum sesuai. Perbaikan diperkirakan 8–10 menit.","prompt":"Apa keputusan berikutnya?","choices":[{"text":"Minta perbaikan segera sambil menyiapkan job produksi lain yang tidak bergantung pada file.","next":null,"consequence":"File lolos pengecekan dan masuk produksi dengan sedikit buffer.","scores":[92,90,90,91],"best":true,"analysis":"Quality gate tetap dijaga sambil mengerjakan aktivitas paralel."},{"text":"Produksi saja; bleed kemungkinan tidak terlalu terlihat.","next":null,"consequence":"Deadline aman, tetapi risiko hasil potong bermasalah meningkat.","scores":[52,20,48,86],"best":false,"analysis":"Kamu hanya melihat deadline langkah pertama dan mengabaikan biaya sesudah produksi."},{"text":"Batalkan target hari ini dan pindahkan ke besok.","next":null,"consequence":"Risiko kualitas hilang, tetapi target dilepas padahal perbaikannya masih feasible.","scores":[64,88,55,40],"best":false,"analysis":"Aman, tetapi terlalu cepat mengorbankan objective."}]}}},{"id":"st-e04","level":"easy","title":"Perjalanan ke Bandara","category":"Buffer & Kontinjensi","objective":"Tiba di bandara tepat waktu tanpa membuat rencana terlalu rapuh.","start":"s1","nodes":{"s1":{"state":"Pesawat pukul 18.30. Perjalanan normal 60 menit dan kamu ingin tiba 90 menit sebelumnya. Hujan mulai turun dan traffic memburuk.","prompt":"Apa keputusan pertamamu?","choices":[{"text":"Berangkat lebih awal sekarang dan pantau rute alternatif.","next":"s2","consequence":"Di tengah jalan rute utama bertambah 20 menit karena genangan.","scores":[94,93,86,82],"best":true,"analysis":"Kamu memakai buffer untuk menyerap ketidakpastian yang memang sedang naik."},{"text":"Tetap berangkat sesuai jadwal awal karena estimasi aplikasi sering berubah.","next":"s2","consequence":"Kemacetan benar-benar memburuk dan buffer hampir habis.","scores":[48,35,56,74],"best":false,"analysis":"Kamu mengabaikan informasi baru padahal downside terlambat sangat besar."},{"text":"Tunggu hujan reda 20 menit agar perjalanan lebih nyaman.","next":"s2","consequence":"Hujan belum reda dan waktu tersisa berkurang.","scores":[35,28,45,42],"best":false,"analysis":"Menunggu mengorbankan aset paling penting dalam situasi ini: waktu."}]},"s2":{"state":"Rute utama sekarang 80 menit. Ada rute alternatif 65 menit tetapi kamu belum pernah memakai jalur itu.","prompt":"Apa yang kamu lakukan?","choices":[{"text":"Pindah ke rute alternatif setelah cek navigasi dan status penutupan jalan.","next":null,"consequence":"Kamu mengambil jalur lebih cepat dengan verifikasi risiko dasar.","scores":[91,86,92,88],"best":true,"analysis":"Kamu tidak sekadar memilih angka terkecil; kamu memastikan alternatif benar-benar executable."},{"text":"Tetap di rute utama karena lebih familiar.","next":null,"consequence":"Risiko salah jalan rendah tetapi delay yang sudah diketahui tetap kamu terima.","scores":[62,68,52,45],"best":false,"analysis":"Familiarity berguna, tetapi tidak boleh mengalahkan data saat buffer kritis."},{"text":"Ambil rute alternatif langsung tanpa cek apa pun.","next":null,"consequence":"Rute bisa lebih cepat, tetapi kamu mengambil risiko bottleneck baru tanpa informasi.","scores":[75,54,84,90],"best":false,"analysis":"Arahnya masuk akal, tetapi proses keputusannya terlalu tipis."}]}}},{"id":"st-m01","level":"medium","title":"Negosiasi Harga","category":"Negosiasi","objective":"Menjual minimal Rp9,2 juta tanpa kehilangan buyer yang serius.","start":"s1","nodes":{"s1":{"state":"Harga listing Rp10 juta. Buyer membuka Rp8 juta dan mengatakan bisa transfer hari ini.","prompt":"Apa respons pertama?","choices":[{"text":"Counter Rp9,7 juta dan tanyakan apakah kecepatan transaksi prioritas buyer.","next":"s2","consequence":"Buyer naik ke Rp9 juta dan menekankan ingin transaksi selesai hari ini.","scores":[92,86,88,85],"best":true,"analysis":"Kamu menjaga ruang negosiasi sekaligus mencari informasi tentang motivasi lawan."},{"text":"Langsung counter Rp9,2 juta karena itu batas minimum.","next":"s2","consequence":"Buyer langsung tahu lantai harga dan tetap menawar Rp9 juta.","scores":[65,64,72,88],"best":false,"analysis":"Cepat, tetapi kamu membocorkan batas terlalu awal."},{"text":"Tolak Rp8 juta tanpa counter.","next":"s2","consequence":"Buyer tetap tertarik tetapi meminta harga terbaikmu.","scores":[60,72,55,52],"best":false,"analysis":"Posisi terjaga, tetapi kamu belum memberi jalur menuju transaksi."}]},"s2":{"state":"Buyer sekarang di Rp9 juta: “Kalau Rp9 juta saya transfer sekarang, kalau lebih saya pikir lagi.”","prompt":"Apa langkah kedua?","choices":[{"text":"Counter Rp9,35 juta dan tawarkan closing sekarang jika disepakati.","next":"s3","consequence":"Buyer naik ke Rp9,2 juta dan meminta bonus ongkir.","scores":[93,88,90,84],"best":true,"analysis":"Kamu bergerak ke batas tanpa langsung memberikannya dan menukar konsesi dengan closing."},{"text":"Terima Rp9 juta karena transaksi cepat.","next":"s3","consequence":"Deal hampir selesai tetapi kamu sudah turun di bawah target sendiri.","scores":[48,35,64,90],"best":false,"analysis":"Kamu mengoptimalkan kepastian sekarang dengan mengorbankan objective utama."},{"text":"Tetap Rp9,7 juta dan jangan bergerak.","next":"s3","consequence":"Buyer mulai kehilangan minat dan mengatakan punya opsi lain.","scores":[58,82,45,38],"best":false,"analysis":"Anchor terlalu kaku bisa menurunkan probability of close."}]},"s3":{"state":"Buyer bersedia Rp9,2 juta jika ongkir Rp80 ribu kamu tanggung.","prompt":"Keputusan final?","choices":[{"text":"Terima jika net setelah ongkir masih sesuai batas ekonomi; langsung kunci pembayaran.","next":null,"consequence":"Deal selesai cepat dengan konsesi yang terukur.","scores":[94,91,92,90],"best":true,"analysis":"Kamu menilai net outcome, bukan ego pada angka headline."},{"text":"Tolak karena Rp9,2 juta adalah batas sebelum ongkir.","next":null,"consequence":"Kamu menjaga margin penuh tetapi buyer batal.","scores":[68,88,58,45],"best":false,"analysis":"Bisa benar jika batas ekonominya keras, tetapi tanpa hitung net keputusan menjadi terlalu kaku."},{"text":"Naikkan lagi ke Rp9,3 juta setelah buyer setuju Rp9,2 juta.","next":null,"consequence":"Buyer merasa terms berubah dan membatalkan transaksi.","scores":[35,40,28,35],"best":false,"analysis":"Menggeser target setelah konvergensi merusak trust."}]}}},{"id":"st-m02","level":"medium","title":"Promo vs Stok","category":"Demand Planning","objective":"Memakai momentum promo tanpa stockout yang merusak penjualan berikutnya.","start":"s1","nodes":{"s1":{"state":"Stok 120 unit. Penjualan normal 15/hari. Promo marketplace 3 hari biasanya menggandakan demand. Restock tercepat 6 hari.","prompt":"Apa keputusan pertama?","choices":[{"text":"Ikut promo dengan kuota stok khusus dan sisakan buffer pascapromo.","next":"s2","consequence":"Hari pertama sangat kuat: 42 unit terjual.","scores":[94,94,84,88],"best":true,"analysis":"Kamu menangkap upside sambil membatasi downside."},{"text":"Masukkan seluruh 120 unit ke promo agar ranking maksimal.","next":"s2","consequence":"Hari pertama kuat tetapi stok turun agresif.","scores":[72,42,70,94],"best":false,"analysis":"Kamu mengoptimalkan momentum satu langkah dan mengabaikan posisi sesudah promo."},{"text":"Tidak ikut promo agar stok aman.","next":"s2","consequence":"Stok aman tetapi kompetitor mendapat kenaikan ranking besar.","scores":[60,92,52,36],"best":false,"analysis":"Downside kecil, tetapi upside ditinggalkan tanpa mencoba mengontrol risiko."}]},"s2":{"state":"Tersisa 78 unit. Supplier memberi tahu restock mundur dari 6 menjadi 8 hari.","prompt":"Apa langkah kedua?","choices":[{"text":"Turunkan kuota promo dan pertahankan stok minimum untuk penjualan organik.","next":"s3","consequence":"Promo melambat tetapi inventory masih tersedia setelah campaign.","scores":[95,94,92,82],"best":true,"analysis":"Kamu memperbarui strategi saat constraint utama memburuk."},{"text":"Pertahankan promo penuh karena ranking sedang naik.","next":"s3","consequence":"Hari kedua kembali kuat dan stok tersisa hanya 34 unit.","scores":[62,38,58,93],"best":false,"analysis":"Kamu memaksimalkan objective lokal sambil memperbesar global risk."},{"text":"Matikan promo sepenuhnya.","next":"s3","consequence":"Stok aman tetapi momentum ranking berhenti mendadak.","scores":[70,90,72,45],"best":false,"analysis":"Lebih aman, tetapi terlalu biner; kuota memberi kontrol lebih halus."}]},"s3":{"state":"Hari ketiga kompetitor menaikkan diskon. Kamu masih punya stok untuk satu dorongan terbatas.","prompt":"Apa langkah terakhir?","choices":[{"text":"Dorong hanya pada jam konversi tertinggi dan tetap jaga stok minimum.","next":null,"consequence":"Kamu tetap kompetitif tanpa menghabiskan inventory.","scores":[94,92,91,90],"best":true,"analysis":"Resource terbatas dialokasikan ke window dengan expected return tertinggi."},{"text":"Samakan diskon kompetitor sepanjang hari.","next":null,"consequence":"Stok habis sebelum restock tiba.","scores":[65,38,58,84],"best":false,"analysis":"Respons cepat tetapi tidak mempertimbangkan konsekuensi sesudah campaign."},{"text":"Hentikan promo sepenuhnya.","next":null,"consequence":"Stok sangat aman tetapi opportunity cost membesar.","scores":[58,93,55,32],"best":false,"analysis":"Strategi defensif penuh mengorbankan terlalu banyak upside."}]}}},{"id":"st-m03","level":"medium","title":"Peluncuran Produk","category":"Release Planning","objective":"Meluncurkan tepat waktu tanpa mengabaikan risiko kritis.","start":"s1","nodes":{"s1":{"state":"Launch Jumat. UAT 96% selesai. Ada satu bug checkout severity tinggi yang belum reproducible konsisten.","prompt":"Apa keputusan awal?","choices":[{"text":"Buat checkpoint Kamis dengan kriteria release/no-release yang eksplisit.","next":"s2","consequence":"Kamis pagi tim menemukan pola bug dan fix diperkirakan 6 jam.","scores":[95,94,90,84],"best":true,"analysis":"Kamu mengubah ketidakpastian menjadi decision gate."},{"text":"Tetap commit go-live karena 96% UAT sudah selesai.","next":"s2","consequence":"Bug muncul lagi saat regression test.","scores":[55,32,58,90],"best":false,"analysis":"Completion rate tidak meniadakan severity dari failure kritis."},{"text":"Batalkan launch sekarang dan pindah seminggu.","next":"s2","consequence":"Risiko turun tetapi slot marketing dan partner campaign hilang.","scores":[66,94,54,35],"best":false,"analysis":"Aman, tetapi terlalu dini mengunci downside."}]},"s2":{"state":"Fix selesai Kamis 17.00. Full regression 5 jam, tim tersedia sampai 21.00.","prompt":"Apa langkah kedua?","choices":[{"text":"Prioritaskan regression payment path malam ini, sisanya pagi sebelum gate.","next":"s3","consequence":"Critical path lolos; area nonkritis tersisa untuk pagi.","scores":[94,90,92,90],"best":true,"analysis":"Kamu memprioritaskan bukti paling relevan untuk keputusan release."},{"text":"Paksa full regression selesai malam ini dengan lembur semua tim.","next":"s3","consequence":"Coverage naik tetapi fatigue meningkatkan human error.","scores":[68,60,58,70],"best":false,"analysis":"Lebih banyak testing tidak selalu lebih baik jika kualitas eksekusinya turun."},{"text":"Skip regression karena fix sudah diverifikasi developer.","next":"s3","consequence":"Waktu aman tetapi tidak ada bukti fix tidak merusak area terkait.","scores":[44,20,50,92],"best":false,"analysis":"Kamu menghilangkan safety net utama demi waktu."}]},"s3":{"state":"Jumat pagi critical tests hijau. Satu issue UI minor masih terbuka dan tidak memengaruhi transaksi.","prompt":"Keputusan launch?","choices":[{"text":"Go-live dengan monitoring dan rollback trigger yang sudah disepakati.","next":null,"consequence":"Launch berjalan dengan risk control yang jelas.","scores":[95,91,94,89],"best":true,"analysis":"Kamu membedakan risiko kritis vs nonkritis dan menyiapkan langkah jika asumsi salah."},{"text":"Tunda karena masih ada satu issue apa pun severity-nya.","next":null,"consequence":"Risiko sangat rendah tetapi momentum launch hilang.","scores":[65,95,58,35],"best":false,"analysis":"Risk management bukan zero-risk; tindakan harus proporsional."},{"text":"Go-live lalu bubarkan war room karena critical test hijau.","next":null,"consequence":"Launch berjalan tetapi respons akan lambat jika masalah produksi muncul.","scores":[68,52,62,88],"best":false,"analysis":"Keputusan launch bisa benar, tetapi langkah berikutnya belum dipikirkan."}]}}},{"id":"st-m04","level":"medium","title":"Bottleneck Tim","category":"Resource Allocation","objective":"Menjaga deadline proyek ketika resource kunci mulai terbatas.","start":"s1","nodes":{"s1":{"state":"Design 2 hari → Build 4 hari → QA 2 hari. Engineer kunci Build juga dibutuhkan proyek lain mulai besok.","prompt":"Apa yang kamu amankan dulu?","choices":[{"text":"Selesaikan Design dan booking waktu engineer untuk critical Build sebelum konflik terjadi.","next":"s2","consequence":"Design selesai; engineer penuh hari pertama Build tetapi hanya setengah hari setelahnya.","scores":[94,91,86,90],"best":true,"analysis":"Kamu melindungi bottleneck sebelum dependency mencapainya."},{"text":"Rapikan dokumentasi karena bisa dilakukan sekarang.","next":"s2","consequence":"Dokumentasi rapi tetapi Build belum punya slot engineer aman.","scores":[50,42,58,78],"best":false,"analysis":"Kamu memilih pekerjaan yang available, bukan yang menentukan critical path."},{"text":"Siapkan QA sedini mungkin walau Build belum ada.","next":"s2","consequence":"Checklist siap tetapi bottleneck Build tetap belum terselesaikan.","scores":[64,60,62,70],"best":false,"analysis":"Paralelisasi berguna, tetapi bukan risiko terbesar."}]},"s2":{"state":"Build berjalan 25% lebih lambat karena engineer terpecah.","prompt":"Apa langkah kedua?","choices":[{"text":"Pisahkan core vs optional scope dan lindungi core agar QA bisa mulai sesuai jadwal.","next":"s3","consequence":"Core selesai mendekati jadwal; fitur minor dipindah setelah release.","scores":[93,89,94,86],"best":true,"analysis":"Kamu memotong scope sebelum delay mengonsumsi seluruh opsi."},{"text":"Pertahankan scope penuh dan kejar dengan overtime di akhir.","next":"s3","consequence":"Delay menumpuk dan QA terancam terpotong.","scores":[55,38,58,74],"best":false,"analysis":"Masalah didorong ke tahap terakhir saat opsi recovery makin sedikit."},{"text":"Tarik engineer sepenuhnya dari proyek lain tanpa koordinasi.","next":"s3","consequence":"Build lebih cepat tetapi proyek lain eskalasi.","scores":[68,52,62,66],"best":false,"analysis":"Bottleneck lokal diselesaikan dengan menciptakan bottleneck organisasi."}]},"s3":{"state":"Core Build selesai. QA menemukan bug medium yang butuh setengah hari; deadline besok siang.","prompt":"Apa langkah terakhir?","choices":[{"text":"Fix sekarang, retest area terkait, lalu release core.","next":null,"consequence":"Release tetap masuk deadline dengan risiko terkontrol.","scores":[94,90,93,87],"best":true,"analysis":"Kamu menjaga quality kritis tanpa menarik kembali scope yang sudah sengaja ditunda."},{"text":"Release dulu dan fix sesudahnya.","next":null,"consequence":"Release lebih cepat tetapi membawa known defect ke user.","scores":[65,52,70,92],"best":false,"analysis":"Waktu masih tersedia; mengambil defect tidak memberi trade-off yang cukup baik."},{"text":"Masukkan kembali fitur minor sambil menunggu bug diperbaiki.","next":null,"consequence":"Surface area berubah lagi tepat sebelum release.","scores":[42,36,45,58],"best":false,"analysis":"Kamu menambah kompleksitas saat uncertainty seharusnya dikurangi."}]}}},{"id":"st-h01","level":"hard","title":"Inventory vs Cashflow","category":"Capital Allocation","objective":"Mengejar margin tanpa mempertaruhkan kewajiban kas yang pasti.","start":"s1","nodes":{"s1":{"state":"Kas Rp100 juta. Ada inventory deal Rp70 juta, expected gross margin 30%, sell-through 60 hari. Dalam 30 hari ada kewajiban pasti Rp45 juta.","prompt":"Apa keputusan pertama?","choices":[{"text":"Hitung ukuran pembelian yang tetap menyisakan buffer di atas kewajiban kas.","next":"s2","consequence":"Supplier bersedia split order, tetapi harga unit naik 4%.","scores":[96,97,90,82],"best":true,"analysis":"Kamu melihat langkah setelah pembelian: survival lebih penting dari margin headline."},{"text":"Ambil penuh Rp70 juta karena margin 30% menarik.","next":"s2","consequence":"Kas tersisa Rp30 juta sementara kewajiban Rp45 juta tetap mendekat.","scores":[50,18,55,92],"best":false,"analysis":"Profit teoritis tidak membantu jika liquidity habis sebelum inventory berubah jadi kas."},{"text":"Tolak seluruh deal agar kas aman.","next":"s2","consequence":"Kas aman, tetapi supplier menawarkan pembayaran bertahap.","scores":[68,98,55,38],"best":false,"analysis":"Downside aman, tetapi kamu belum mengeksplor struktur yang bisa menjaga upside."}]},"s2":{"state":"Supplier menawarkan 50% sekarang dan 50% dalam 45 hari, harga naik 6%. Sell-through tetap 60 hari.","prompt":"Apa langkah kedua?","choices":[{"text":"Model worst-case 90 hari dan hanya ambil jumlah yang tetap menutup kewajiban tanpa mengandalkan penjualan cepat.","next":"s3","consequence":"Dengan ukuran lebih kecil return tetap positif dan kewajiban 30 hari aman.","scores":[96,98,92,80],"best":true,"analysis":"Kamu menilai struktur pada skenario buruk, bukan base case."},{"text":"Ambil penuh karena cicilan kedua baru 45 hari lagi.","next":"s3","consequence":"Cashflow membaik sementara tetapi cicilan kedua jatuh sebelum base sell-through selesai.","scores":[60,36,64,90],"best":false,"analysis":"Terms terlihat ringan di langkah pertama tetapi maturity mismatch tetap ada."},{"text":"Minta tenor 90 hari dan hanya lanjut jika disetujui.","next":"s3","consequence":"Supplier menolak 90 hari tetapi menawarkan 60 hari dengan deposit 30%.","scores":[83,90,78,62],"best":false,"analysis":"Arah negosiasi baik, tetapi keputusan belum memasukkan ukuran posisi."}]},"s3":{"state":"Dua minggu kemudian demand melemah 25%. Supplier menawarkan tambahan order dengan diskon ekstra.","prompt":"Apa keputusan ketiga?","choices":[{"text":"Jangan tambah exposure; fokus mempercepat sell-through dan lindungi cash buffer.","next":"s4","consequence":"Inventory bergerak lebih lambat tetapi posisi kas tetap sehat.","scores":[96,98,95,84],"best":true,"analysis":"Informasi baru memperburuk outcome distribution, jadi strategi ikut berubah."},{"text":"Tambah order karena harga kini lebih murah.","next":"s4","consequence":"Average cost turun tetapi cash conversion cycle memburuk.","scores":[48,22,45,88],"best":false,"analysis":"Harga lebih murah bukan alasan menambah posisi ketika demand thesis melemah."},{"text":"Diskon semua inventory sampai hampir break-even.","next":"s4","consequence":"Cash kembali cepat tetapi terlalu banyak margin dikorbankan.","scores":[70,84,78,52],"best":false,"analysis":"De-risking masuk akal, tetapi respons ini belum proporsional."}]},"s4":{"state":"Kewajiban Rp45 juta jatuh tempo dua minggu lagi. Kas kini cukup membayar kewajiban dengan buffer kecil.","prompt":"Apa prioritas final?","choices":[{"text":"Kunci dana kewajiban; keputusan inventory berikutnya hanya memakai kas di luar buffer.","next":null,"consequence":"Kewajiban aman dan bisnis masih punya ruang bergerak.","scores":[97,99,94,86],"best":true,"analysis":"Capital yang tidak boleh dipertaruhkan dipisahkan dari capital yang bisa dioptimalkan."},{"text":"Gunakan sebagian dana kewajiban untuk promo besar agar inventory cepat habis.","next":null,"consequence":"Solvency kini bergantung pada outcome campaign.","scores":[58,20,62,90],"best":false,"analysis":"Kebutuhan pasti kembali dipertaruhkan untuk hasil yang belum pasti."},{"text":"Bayar kewajiban sekarang seluruhnya meski belum jatuh tempo.","next":null,"consequence":"Kewajiban hilang tetapi operational buffer menjadi tipis.","scores":[72,96,65,42],"best":false,"analysis":"Kamu menghapus satu risiko sambil membuat sistem rapuh terhadap gangguan lain."}]}}},{"id":"st-h02","level":"hard","title":"Incident Payment System","category":"Incident Response","objective":"Memulihkan layanan tanpa memperbesar kerusakan atau kehilangan opsi rollback.","start":"s1","nodes":{"s1":{"state":"Error pembayaran melonjak dari 1% ke 18% lima menit setelah release baru. Belum jelas apakah penyebabnya release atau provider eksternal.","prompt":"Apa langkah pertama?","choices":[{"text":"Freeze perubahan lain, bandingkan telemetry sebelum/sesudah release, dan siapkan rollback sambil cek provider.","next":"s2","consequence":"Error terkonsentrasi pada path baru; provider eksternal normal.","scores":[97,96,92,86],"best":true,"analysis":"Kamu menjaga opsi rollback sambil mencari evidence yang paling membedakan hipotesis."},{"text":"Rollback langsung tanpa cek apa pun.","next":"s2","consequence":"Error turun sebagian tetapi tim belum tahu apakah ada faktor kedua.","scores":[78,88,72,82],"best":false,"analysis":"Cepat, tetapi kamu kehilangan informasi yang dibutuhkan untuk langkah berikutnya."},{"text":"Tunggu 15 menit untuk melihat apakah error turun sendiri.","next":"s2","consequence":"Error naik ke 26% dan transaksi gagal bertambah.","scores":[32,18,45,62],"best":false,"analysis":"Menunggu tanpa mitigation memperbesar blast radius."}]},"s2":{"state":"Evidence mengarah ke release. Rollback 8 menit. Ada 400 transaksi berstatus ambigu yang bisa terduplikasi jika retry sembarangan.","prompt":"Apa langkah kedua?","choices":[{"text":"Rollback, hentikan retry otomatis transaksi ambigu, dan tandai batch untuk rekonsiliasi.","next":"s3","consequence":"Error baru turun ke baseline dan batch 400 transaksi tidak bertambah.","scores":[98,98,95,88],"best":true,"analysis":"Sumber masalah diperbaiki sambil mencegah secondary failure."},{"text":"Rollback lalu retry semua transaksi agar customer cepat selesai.","next":"s3","consequence":"Sebagian transaksi terduplikasi karena status awal belum diketahui.","scores":[62,28,58,94],"best":false,"analysis":"Recovery speed diprioritaskan di atas state ambiguity."},{"text":"Jangan rollback; patch cepat langsung di production.","next":"s3","consequence":"Satu path membaik tetapi error baru muncul di metode lain.","scores":[48,30,52,78],"best":false,"analysis":"Kamu menambah perubahan sebelum sistem distabilkan."}]},"s3":{"state":"Layanan normal. Support menerima laporan charge ganda dari sebagian kecil user.","prompt":"Apa langkah ketiga?","choices":[{"text":"Rekonsiliasi batch terpisah, identifikasi affected users, dan siapkan komunikasi proaktif.","next":"s4","consequence":"Tim menemukan 17 transaksi ganda dan bisa memproses reversal terarah.","scores":[97,95,96,86],"best":true,"analysis":"Objective bergeser dari uptime ke containment dan trust."},{"text":"Tunggu semua komplain masuk agar hanya menangani kasus yang dilaporkan.","next":"s4","consequence":"Beberapa user eskalasi lebih dulu di media sosial.","scores":[50,35,58,72],"best":false,"analysis":"Reactive-only membuat biaya reputasi ditentukan oleh siapa yang menemukan masalah duluan."},{"text":"Refund semua 400 transaksi ambigu.","next":"s4","consequence":"Banyak refund tidak diperlukan dan rekonsiliasi menjadi lebih rumit.","scores":[58,64,52,30],"best":false,"analysis":"Aksi massal mengurangi satu risiko sambil menciptakan state baru yang lebih kompleks."}]},"s4":{"state":"Root cause sudah dipahami. Tim ingin deploy ulang fix malam ini agar feature tetap sesuai jadwal.","prompt":"Apa keputusan terakhir?","choices":[{"text":"Deploy hanya setelah reproduction test, regression kritis, rollback plan, dan monitoring trigger siap.","next":null,"consequence":"Fix punya gate jelas sebelum traffic penuh kembali.","scores":[97,96,95,84],"best":true,"analysis":"Pelajaran dari insiden masuk ke keputusan berikutnya, bukan cuma kembali ke jadwal lama."},{"text":"Deploy malam ini karena root cause sudah diketahui.","next":null,"consequence":"Root cause benar tetapi satu regression lain lolos karena validation terlalu sempit.","scores":[66,48,60,90],"best":false,"analysis":"Mengetahui sebab bukan sama dengan membuktikan fix aman."},{"text":"Bekukan feature tanpa batas waktu.","next":null,"consequence":"Risiko release hilang tetapi tidak ada jalur kembali menuju objective produk.","scores":[72,98,55,30],"best":false,"analysis":"Risk control perlu exit criteria."}]}}},{"id":"st-h03","level":"hard","title":"Kompetitor Memotong Harga","category":"Competitive Strategy","objective":"Melindungi margin dan demand tanpa terjebak perang harga otomatis.","start":"s1","nodes":{"s1":{"state":"Produkmu Rp120 ribu dengan margin 28%. Kompetitor turun ke Rp99 ribu selama 7 hari. Conversion-mu turun 12% dalam 24 jam.","prompt":"Apa langkah pertama?","choices":[{"text":"Pisahkan apakah penurunan berasal dari traffic, conversion, atau repeat buyer sebelum mengubah harga.","next":"s2","consequence":"Traffic stabil; penurunan hampir seluruhnya dari conversion user baru.","scores":[96,91,93,78],"best":true,"analysis":"Kamu mencari mekanisme sebelum memilih senjata."},{"text":"Langsung samakan harga Rp99 ribu.","next":"s2","consequence":"Conversion pulih sebagian tetapi margin turun tajam.","scores":[62,42,62,94],"best":false,"analysis":"Kamu mengobati gejala sebelum tahu segmen mana yang perlu insentif."},{"text":"Abaikan kompetitor karena margin lebih penting.","next":"s2","consequence":"Conversion user baru terus melemah sementara repeat buyer stabil.","scores":[55,82,50,45],"best":false,"analysis":"Menjaga margin bisa benar, tetapi tidak merespons perubahan sama sekali terlalu pasif."}]},"s2":{"state":"Repeat buyer stabil; user baru sensitif harga. Kamu bisa memberi voucher khusus first purchase.","prompt":"Apa langkah kedua?","choices":[{"text":"Tes voucher first purchase terbatas dan ukur incremental conversion serta margin.","next":"s3","consequence":"Conversion user baru pulih 8 poin tanpa mendiskon repeat buyer.","scores":[96,90,92,91],"best":true,"analysis":"Insentif diarahkan tepat ke segmen yang bermasalah."},{"text":"Turunkan harga publik untuk semua user.","next":"s3","consequence":"Conversion pulih lebih kuat tetapi margin repeat buyer ikut turun.","scores":[72,55,68,82],"best":false,"analysis":"Solusi bekerja tetapi kamu membayar diskon pada user yang tidak membutuhkannya."},{"text":"Beri bonus produk gratis ke semua pembeli.","next":"s3","consequence":"Value naik tetapi cost per order hampir sama dengan diskon besar.","scores":[70,62,66,64],"best":false,"analysis":"Bentuk promosi berubah, economics-nya belum tentu membaik."}]},"s3":{"state":"Hari ketiga kompetitor turun lagi ke Rp94 ribu. Voucher-mu masih profitable tetapi gap harga melebar.","prompt":"Apa langkah ketiga?","choices":[{"text":"Tetapkan batas economics sendiri dan jangan mengejar setiap perubahan kompetitor.","next":"s4","consequence":"Volume tidak maksimal tetapi unit economics tetap sehat.","scores":[96,95,94,84],"best":true,"analysis":"Kamu menetapkan rule sebelum emosi kompetitif mengambil alih."},{"text":"Turunkan sedikit di bawah Rp94 ribu.","next":"s4","consequence":"Volume naik tetapi margin mendekati nol dan kompetitor masih bisa merespons.","scores":[50,22,48,90],"best":false,"analysis":"Kamu membuka game yang lawan masih bisa lanjutkan sementara downside terus membesar."},{"text":"Cabut seluruh voucher.","next":"s4","consequence":"Margin pulih tetapi acquisition user baru turun drastis.","scores":[68,90,62,46],"best":false,"analysis":"Keluar total terlalu biner ketika eksperimen masih profitable."}]},"s4":{"state":"Promo kompetitor selesai dan harga mereka kembali normal. Sebagian user baru sudah repeat purchase tanpa voucher.","prompt":"Apa langkah terakhir?","choices":[{"text":"Hentikan insentif yang tak lagi perlu dan ukur cohort berdasarkan repeat rate serta contribution margin.","next":null,"consequence":"Kamu menilai apakah taktik sementara menghasilkan customer bernilai.","scores":[96,92,95,88],"best":true,"analysis":"Langkah setelah promo menentukan apakah strategi menciptakan value jangka panjang."},{"text":"Pertahankan voucher permanen karena conversion sempat bagus.","next":null,"consequence":"Conversion tinggi tetapi subsidi terus dibayar tanpa tekanan kompetitif.","scores":[58,48,60,72],"best":false,"analysis":"Taktik sementara berubah jadi kebiasaan tanpa evidence."},{"text":"Naikkan harga di atas level awal untuk mengejar margin yang hilang.","next":null,"consequence":"Margin per order naik tetapi sebagian cohort baru tidak bertahan.","scores":[52,56,45,58],"best":false,"analysis":"Mengejar margin masa lalu bisa merusak economics masa depan."}]}}},{"id":"st-h04","level":"hard","title":"Project dengan Tiga Dependency","category":"Project Strategy","objective":"Mencapai deadline ketika dependency teknis, approval, dan kapasitas berubah.","start":"s1","nodes":{"s1":{"state":"Deadline 8 hari. Design 2 hari, Build 3 hari setelah Design, Legal 2 hari bisa paralel, QA 2 hari setelah Build. Buffer hanya 1 hari.","prompt":"Apa keputusan pertama?","choices":[{"text":"Mulai Design dan Legal paralel hari ini, sekaligus booking QA.","next":"s2","consequence":"Design on track; Legal meminta dokumen tambahan setengah hari.","scores":[97,94,90,92],"best":true,"analysis":"Kamu menjalankan dependency paralel dan mengamankan resource downstream sebelum dibutuhkan."},{"text":"Selesaikan Design dulu baru mulai Legal.","next":"s2","consequence":"Design selesai tetapi Legal baru mulai saat buffer hampir habis.","scores":[55,42,58,70],"best":false,"analysis":"Dependency yang bisa paralel dibuat serial."},{"text":"Mulai Build dengan draft Design agar hemat dua hari.","next":"s2","consequence":"Engineer cepat bergerak tetapi beberapa keputusan desain berubah.","scores":[66,38,62,90],"best":false,"analysis":"Waktu dibeli dengan risiko rework di critical path."}]},"s2":{"state":"Hari ketiga Design final. Legal tinggal setengah hari. Engineer utama sakit dan kapasitas Build turun 30%.","prompt":"Apa langkah kedua?","choices":[{"text":"Pisahkan core vs optional, alihkan bantuan ke core, biarkan Legal selesai paralel.","next":"s3","consequence":"Core Build masih punya peluang selesai cukup awal untuk QA.","scores":[96,94,95,86],"best":true,"analysis":"Critical path dilindungi dengan mengurangi scope sebelum delay menghabiskan buffer."},{"text":"Pertahankan semua scope dan kejar dengan overtime nanti.","next":"s3","consequence":"Build terlambat dan QA terjepit ke hari terakhir.","scores":[54,35,56,72],"best":false,"analysis":"Masalah didorong ke tahap paling sulit dipulihkan."},{"text":"Tunda seluruh proyek dua hari sekarang.","next":"s3","consequence":"Risiko turun tetapi stakeholder kehilangan deadline tanpa mencoba recovery.","scores":[67,95,60,35],"best":false,"analysis":"Safety tinggi tetapi belum proporsional dengan opsi mitigasi yang tersedia."}]},"s3":{"state":"Core Build selesai hari keenam pagi. Legal approve. QA menemukan bug yang hanya muncul pada 8% transaksi tetapi bisa memblokir checkout.","prompt":"Apa langkah ketiga?","choices":[{"text":"Fix sebelum release dan gunakan buffer untuk targeted retest checkout.","next":"s4","consequence":"Fix selesai hari keenam sore dan regression terkait lolos.","scores":[97,95,93,88],"best":true,"analysis":"Probability kecil tidak menghapus impact besar; buffer memang untuk risiko seperti ini."},{"text":"Release dulu karena bug hanya 8%.","next":"s4","consequence":"Sebagian user terdampak dan support naik saat hotfix disiapkan.","scores":[58,38,63,90],"best":false,"analysis":"Kamu fokus pada probability dan kurang memberi bobot pada impact."},{"text":"Tunda satu minggu penuh untuk full regression ulang.","next":"s4","consequence":"Risiko teknis rendah tetapi deadline hilang jauh lebih besar dari kebutuhan fix.","scores":[68,98,60,30],"best":false,"analysis":"Mitigasi terlalu besar dibanding problem yang sudah terlokalisasi."}]},"s4":{"state":"Targeted regression hijau. Satu hari tersisa dan optional feature belum masuk.","prompt":"Keputusan terakhir?","choices":[{"text":"Release core sesuai deadline dan beri owner serta tanggal untuk optional feature.","next":null,"consequence":"Objective utama tercapai dan scope tertunda tetap punya follow-up jelas.","scores":[97,94,96,90],"best":true,"analysis":"Keputusan sementara ditutup dengan tindak lanjut konkret."},{"text":"Gunakan hari terakhir untuk memasukkan optional feature juga.","next":null,"consequence":"Surface area berubah lagi tepat setelah regression selesai.","scores":[50,34,48,74],"best":false,"analysis":"Extra time bukan otomatis extra scope; buffer terakhir adalah insurance."},{"text":"Tunda sampai optional feature selesai agar versi lengkap.","next":null,"consequence":"Completeness naik tetapi deadline yang sudah achievable hilang.","scores":[62,90,52,32],"best":false,"analysis":"Completeness bukan objective utama ketika core sudah memenuhi outcome."}]}}}];
var STRATEGY_BANK={easy:STRATEGY_SCENARIOS.filter(function(x){return x.level==='easy'}),medium:STRATEGY_SCENARIOS.filter(function(x){return x.level==='medium'}),hard:STRATEGY_SCENARIOS.filter(function(x){return x.level==='hard'})};


// Simulasi bercabang dengan akumulasi waktu dan biaya yang konsisten.
STRATEGY_SCENARIOS.push(...[
  {
    "id": "oct26-st-dokumen",
    "level": "easy",
    "title": "Dokumen Sebelum Loket Tutup",
    "category": "Perencanaan sumber daya",
    "objective": "Selesaikan semua tahap dalam 60 menit dengan biaya maksimal Rp45 ribu. Di antara rencana yang memenuhi keduanya, pilih total biaya terendah. Jika sasaran sudah tak mungkin, minimalkan keterlambatan, lalu kelebihan biaya, lalu biaya total.",
    "start": "s",
    "nodes": {
      "s0": {
        "state": "Waktu terpakai 35/60 menit. Biaya terpakai Rp5/Rp45 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mencetak dokumen: Printer sendiri (35 menit, Rp5 ribu), Kios dekat (15 menit, Rp20 ribu), Cetak ekspres (10 menit, Rp35 ribu). Menuju loket: Bus (35 menit, Rp5 ribu), Ojek (20 menit, Rp20 ribu), Taksi (15 menit, Rp40 ribu).",
        "prompt": "Tahap 2/2: Menuju loket. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Bus · 35 menit · Rp5 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 60 menit dan Rp10 dari Rp45 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Ojek · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 60 menit dan Rp25 dari Rp45 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Taksi · 15 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 50 dari 60 menit dan Rp45 dari Rp45 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s1": {
        "state": "Waktu terpakai 15/60 menit. Biaya terpakai Rp20/Rp45 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mencetak dokumen: Printer sendiri (35 menit, Rp5 ribu), Kios dekat (15 menit, Rp20 ribu), Cetak ekspres (10 menit, Rp35 ribu). Menuju loket: Bus (35 menit, Rp5 ribu), Ojek (20 menit, Rp20 ribu), Taksi (15 menit, Rp40 ribu).",
        "prompt": "Tahap 2/2: Menuju loket. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Bus · 35 menit · Rp5 ribu",
            "next": null,
            "consequence": "Terpakai 50 dari 60 menit dan Rp25 dari Rp45 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Ojek · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 35 dari 60 menit dan Rp40 dari Rp45 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Taksi · 15 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 30 dari 60 menit dan Rp60 dari Rp45 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s2": {
        "state": "Waktu terpakai 10/60 menit. Biaya terpakai Rp35/Rp45 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mencetak dokumen: Printer sendiri (35 menit, Rp5 ribu), Kios dekat (15 menit, Rp20 ribu), Cetak ekspres (10 menit, Rp35 ribu). Menuju loket: Bus (35 menit, Rp5 ribu), Ojek (20 menit, Rp20 ribu), Taksi (15 menit, Rp40 ribu).",
        "prompt": "Tahap 2/2: Menuju loket. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Bus · 35 menit · Rp5 ribu",
            "next": null,
            "consequence": "Terpakai 45 dari 60 menit dan Rp40 dari Rp45 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Ojek · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 30 dari 60 menit dan Rp55 dari Rp45 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Taksi · 15 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 25 dari 60 menit dan Rp75 dari Rp45 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s": {
        "state": "Waktu terpakai 0/60 menit. Biaya terpakai Rp0/Rp45 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mencetak dokumen: Printer sendiri (35 menit, Rp5 ribu), Kios dekat (15 menit, Rp20 ribu), Cetak ekspres (10 menit, Rp35 ribu). Menuju loket: Bus (35 menit, Rp5 ribu), Ojek (20 menit, Rp20 ribu), Taksi (15 menit, Rp40 ribu).",
        "prompt": "Tahap 1/2: Mencetak dokumen. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Printer sendiri · 35 menit · Rp5 ribu",
            "next": "s0",
            "consequence": "Terpakai 35 dari 60 menit dan Rp5 dari Rp45 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kios dekat · 15 menit · Rp20 ribu",
            "next": "s1",
            "consequence": "Terpakai 15 dari 60 menit dan Rp20 dari Rp45 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Cetak ekspres · 10 menit · Rp35 ribu",
            "next": "s2",
            "consequence": "Terpakai 10 dari 60 menit dan Rp35 dari Rp45 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      }
    }
  },
  {
    "id": "oct26-st-paket",
    "level": "easy",
    "title": "Paket Sebelum Kurir Datang",
    "category": "Perencanaan sumber daya",
    "objective": "Selesaikan semua tahap dalam 50 menit dengan biaya maksimal Rp35 ribu. Di antara rencana yang memenuhi keduanya, pilih total biaya terendah. Jika sasaran sudah tak mungkin, minimalkan keterlambatan, lalu kelebihan biaya, lalu biaya total.",
    "start": "s",
    "nodes": {
      "s0": {
        "state": "Waktu terpakai 30/50 menit. Biaya terpakai Rp5/Rp35 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengemas: Kemas sendiri (30 menit, Rp5 ribu), Bantu staf (15 menit, Rp20 ribu), Jasa ekspres (10 menit, Rp30 ribu). Menyiapkan label: Tulis dan cek manual (25 menit, Rp0 ribu), Cetak di kios (15 menit, Rp10 ribu), Cetak ekspres (5 menit, Rp25 ribu).",
        "prompt": "Tahap 2/2: Menyiapkan label. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Tulis dan cek manual · 25 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 50 menit dan Rp5 dari Rp35 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Cetak di kios · 15 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 45 dari 50 menit dan Rp15 dari Rp35 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Cetak ekspres · 5 menit · Rp25 ribu",
            "next": null,
            "consequence": "Terpakai 35 dari 50 menit dan Rp30 dari Rp35 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s1": {
        "state": "Waktu terpakai 15/50 menit. Biaya terpakai Rp20/Rp35 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengemas: Kemas sendiri (30 menit, Rp5 ribu), Bantu staf (15 menit, Rp20 ribu), Jasa ekspres (10 menit, Rp30 ribu). Menyiapkan label: Tulis dan cek manual (25 menit, Rp0 ribu), Cetak di kios (15 menit, Rp10 ribu), Cetak ekspres (5 menit, Rp25 ribu).",
        "prompt": "Tahap 2/2: Menyiapkan label. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Tulis dan cek manual · 25 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 40 dari 50 menit dan Rp20 dari Rp35 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Cetak di kios · 15 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 30 dari 50 menit dan Rp30 dari Rp35 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Cetak ekspres · 5 menit · Rp25 ribu",
            "next": null,
            "consequence": "Terpakai 20 dari 50 menit dan Rp45 dari Rp35 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s2": {
        "state": "Waktu terpakai 10/50 menit. Biaya terpakai Rp30/Rp35 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengemas: Kemas sendiri (30 menit, Rp5 ribu), Bantu staf (15 menit, Rp20 ribu), Jasa ekspres (10 menit, Rp30 ribu). Menyiapkan label: Tulis dan cek manual (25 menit, Rp0 ribu), Cetak di kios (15 menit, Rp10 ribu), Cetak ekspres (5 menit, Rp25 ribu).",
        "prompt": "Tahap 2/2: Menyiapkan label. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Tulis dan cek manual · 25 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 35 dari 50 menit dan Rp30 dari Rp35 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Cetak di kios · 15 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 25 dari 50 menit dan Rp40 dari Rp35 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Cetak ekspres · 5 menit · Rp25 ribu",
            "next": null,
            "consequence": "Terpakai 15 dari 50 menit dan Rp55 dari Rp35 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s": {
        "state": "Waktu terpakai 0/50 menit. Biaya terpakai Rp0/Rp35 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengemas: Kemas sendiri (30 menit, Rp5 ribu), Bantu staf (15 menit, Rp20 ribu), Jasa ekspres (10 menit, Rp30 ribu). Menyiapkan label: Tulis dan cek manual (25 menit, Rp0 ribu), Cetak di kios (15 menit, Rp10 ribu), Cetak ekspres (5 menit, Rp25 ribu).",
        "prompt": "Tahap 1/2: Mengemas. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kemas sendiri · 30 menit · Rp5 ribu",
            "next": "s0",
            "consequence": "Terpakai 30 dari 50 menit dan Rp5 dari Rp35 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantu staf · 15 menit · Rp20 ribu",
            "next": "s1",
            "consequence": "Terpakai 15 dari 50 menit dan Rp20 dari Rp35 ribu.",
            "scores": [
              90,
              90,
              90,
              90
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Jasa ekspres · 10 menit · Rp30 ribu",
            "next": "s2",
            "consequence": "Terpakai 10 dari 50 menit dan Rp30 dari Rp35 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      }
    }
  },
  {
    "id": "oct26-st-pameran",
    "level": "medium",
    "title": "Persiapan Stan Pameran",
    "category": "Perencanaan sumber daya",
    "objective": "Selesaikan semua tahap dalam 100 menit dengan biaya maksimal Rp80 ribu. Di antara rencana yang memenuhi keduanya, pilih total biaya terendah. Jika sasaran sudah tak mungkin, minimalkan keterlambatan, lalu kelebihan biaya, lalu biaya total.",
    "start": "s",
    "nodes": {
      "s00": {
        "state": "Waktu terpakai 85/100 menit. Biaya terpakai Rp5/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 3/3: Menguji listrik. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Teknisi reguler · 25 menit · Rp15 ribu",
            "next": null,
            "consequence": "Terpakai 110 dari 100 menit dan Rp20 dari Rp80 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi cepat · 15 menit · Rp25 ribu",
            "next": null,
            "consequence": "Terpakai 100 dari 100 menit dan Rp30 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp45 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 100 menit dan Rp50 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s01": {
        "state": "Waktu terpakai 65/100 menit. Biaya terpakai Rp30/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 3/3: Menguji listrik. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Teknisi reguler · 25 menit · Rp15 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 100 menit dan Rp45 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 15 menit · Rp25 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 100 menit dan Rp55 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp45 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 100 menit dan Rp75 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              65,
              65,
              65,
              65
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s02": {
        "state": "Waktu terpakai 55/100 menit. Biaya terpakai Rp55/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 3/3: Menguji listrik. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Teknisi reguler · 25 menit · Rp15 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 100 menit dan Rp70 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 15 menit · Rp25 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 100 menit dan Rp80 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp45 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 100 menit dan Rp100 dari Rp80 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s0": {
        "state": "Waktu terpakai 35/100 menit. Biaya terpakai Rp0/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 2/3: Merakit stan. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Sendiri · 50 menit · Rp5 ribu",
            "next": "s00",
            "consequence": "Terpakai 85 dari 100 menit dan Rp5 dari Rp80 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Satu asisten · 30 menit · Rp30 ribu",
            "next": "s01",
            "consequence": "Terpakai 65 dari 100 menit dan Rp30 dari Rp80 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim ekspres · 20 menit · Rp55 ribu",
            "next": "s02",
            "consequence": "Terpakai 55 dari 100 menit dan Rp55 dari Rp80 ribu.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s10": {
        "state": "Waktu terpakai 65/100 menit. Biaya terpakai Rp25/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 3/3: Menguji listrik. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Teknisi reguler · 25 menit · Rp15 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 100 menit dan Rp40 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 15 menit · Rp25 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 100 menit dan Rp50 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp45 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 100 menit dan Rp70 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              65,
              65,
              65,
              65
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s11": {
        "state": "Waktu terpakai 45/100 menit. Biaya terpakai Rp50/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 3/3: Menguji listrik. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Teknisi reguler · 25 menit · Rp15 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 100 menit dan Rp65 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 15 menit · Rp25 ribu",
            "next": null,
            "consequence": "Terpakai 60 dari 100 menit dan Rp75 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp45 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 100 menit dan Rp95 dari Rp80 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s12": {
        "state": "Waktu terpakai 35/100 menit. Biaya terpakai Rp75/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 3/3: Menguji listrik. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Teknisi reguler · 25 menit · Rp15 ribu",
            "next": null,
            "consequence": "Terpakai 60 dari 100 menit dan Rp90 dari Rp80 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 15 menit · Rp25 ribu",
            "next": null,
            "consequence": "Terpakai 50 dari 100 menit dan Rp100 dari Rp80 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp45 ribu",
            "next": null,
            "consequence": "Terpakai 45 dari 100 menit dan Rp120 dari Rp80 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s1": {
        "state": "Waktu terpakai 15/100 menit. Biaya terpakai Rp20/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 2/3: Merakit stan. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Sendiri · 50 menit · Rp5 ribu",
            "next": "s10",
            "consequence": "Terpakai 65 dari 100 menit dan Rp25 dari Rp80 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Satu asisten · 30 menit · Rp30 ribu",
            "next": "s11",
            "consequence": "Terpakai 45 dari 100 menit dan Rp50 dari Rp80 ribu.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim ekspres · 20 menit · Rp55 ribu",
            "next": "s12",
            "consequence": "Terpakai 35 dari 100 menit dan Rp75 dari Rp80 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s20": {
        "state": "Waktu terpakai 60/100 menit. Biaya terpakai Rp45/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 3/3: Menguji listrik. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Teknisi reguler · 25 menit · Rp15 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 100 menit dan Rp60 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 15 menit · Rp25 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 100 menit dan Rp70 dari Rp80 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp45 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 100 menit dan Rp90 dari Rp80 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s21": {
        "state": "Waktu terpakai 40/100 menit. Biaya terpakai Rp70/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 3/3: Menguji listrik. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Teknisi reguler · 25 menit · Rp15 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 100 menit dan Rp85 dari Rp80 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 15 menit · Rp25 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 100 menit dan Rp95 dari Rp80 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp45 ribu",
            "next": null,
            "consequence": "Terpakai 50 dari 100 menit dan Rp115 dari Rp80 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s22": {
        "state": "Waktu terpakai 30/100 menit. Biaya terpakai Rp95/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 3/3: Menguji listrik. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Teknisi reguler · 25 menit · Rp15 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 100 menit dan Rp110 dari Rp80 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 15 menit · Rp25 ribu",
            "next": null,
            "consequence": "Terpakai 45 dari 100 menit dan Rp120 dari Rp80 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp45 ribu",
            "next": null,
            "consequence": "Terpakai 40 dari 100 menit dan Rp140 dari Rp80 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s2": {
        "state": "Waktu terpakai 10/100 menit. Biaya terpakai Rp40/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 2/3: Merakit stan. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Sendiri · 50 menit · Rp5 ribu",
            "next": "s20",
            "consequence": "Terpakai 60 dari 100 menit dan Rp45 dari Rp80 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Satu asisten · 30 menit · Rp30 ribu",
            "next": "s21",
            "consequence": "Terpakai 40 dari 100 menit dan Rp70 dari Rp80 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim ekspres · 20 menit · Rp55 ribu",
            "next": "s22",
            "consequence": "Terpakai 30 dari 100 menit dan Rp95 dari Rp80 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s": {
        "state": "Waktu terpakai 0/100 menit. Biaya terpakai Rp0/Rp80 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil bahan: Jalan kaki (35 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Taksi (10 menit, Rp40 ribu). Merakit stan: Sendiri (50 menit, Rp5 ribu), Satu asisten (30 menit, Rp30 ribu), Tim ekspres (20 menit, Rp55 ribu). Menguji listrik: Teknisi reguler (25 menit, Rp15 ribu), Teknisi cepat (15 menit, Rp25 ribu), Teknisi prioritas (10 menit, Rp45 ribu).",
        "prompt": "Tahap 1/3: Mengambil bahan. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Jalan kaki · 35 menit · Rp0 ribu",
            "next": "s0",
            "consequence": "Terpakai 35 dari 100 menit dan Rp0 dari Rp80 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Ojek · 15 menit · Rp20 ribu",
            "next": "s1",
            "consequence": "Terpakai 15 dari 100 menit dan Rp20 dari Rp80 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Taksi · 10 menit · Rp40 ribu",
            "next": "s2",
            "consequence": "Terpakai 10 dari 100 menit dan Rp40 dari Rp80 ribu.",
            "scores": [
              65,
              65,
              65,
              65
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      }
    }
  },
  {
    "id": "oct26-st-katering",
    "level": "medium",
    "title": "Konsumsi untuk Kelas",
    "category": "Perencanaan sumber daya",
    "objective": "Selesaikan semua tahap dalam 90 menit dengan biaya maksimal Rp70 ribu. Di antara rencana yang memenuhi keduanya, pilih total biaya terendah. Jika sasaran sudah tak mungkin, minimalkan keterlambatan, lalu kelebihan biaya, lalu biaya total.",
    "start": "s",
    "nodes": {
      "s00": {
        "state": "Waktu terpakai 70/90 menit. Biaya terpakai Rp15/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/3: Mengantar ke kelas. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Mobil bersama · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 100 dari 90 menit dan Rp25 dari Rp70 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 90 menit dan Rp35 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Pengiriman prioritas · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 90 menit dan Rp55 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s01": {
        "state": "Waktu terpakai 55/90 menit. Biaya terpakai Rp30/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/3: Mengantar ke kelas. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Mobil bersama · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 90 menit dan Rp40 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 90 menit dan Rp50 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Pengiriman prioritas · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 90 menit dan Rp70 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              65,
              65,
              65,
              65
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s02": {
        "state": "Waktu terpakai 45/90 menit. Biaya terpakai Rp50/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/3: Mengantar ke kelas. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Mobil bersama · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 90 menit dan Rp60 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 90 menit dan Rp70 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Pengiriman prioritas · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 90 menit dan Rp90 dari Rp70 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s0": {
        "state": "Waktu terpakai 30/90 menit. Biaya terpakai Rp5/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 2/3: Mengisi makanan. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 40 menit · Rp10 ribu",
            "next": "s00",
            "consequence": "Terpakai 70 dari 90 menit dan Rp15 dari Rp70 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantuan satu orang · 25 menit · Rp25 ribu",
            "next": "s01",
            "consequence": "Terpakai 55 dari 90 menit dan Rp30 dari Rp70 ribu.",
            "scores": [
              90,
              90,
              90,
              90
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Dua orang tambahan · 15 menit · Rp45 ribu",
            "next": "s02",
            "consequence": "Terpakai 45 dari 90 menit dan Rp50 dari Rp70 ribu.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s10": {
        "state": "Waktu terpakai 60/90 menit. Biaya terpakai Rp25/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/3: Mengantar ke kelas. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Mobil bersama · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 90 menit dan Rp35 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 90 menit dan Rp45 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Pengiriman prioritas · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 90 menit dan Rp65 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              65,
              65,
              65,
              65
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s11": {
        "state": "Waktu terpakai 45/90 menit. Biaya terpakai Rp40/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/3: Mengantar ke kelas. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Mobil bersama · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 90 menit dan Rp50 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 90 menit dan Rp60 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Pengiriman prioritas · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 90 menit dan Rp80 dari Rp70 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s12": {
        "state": "Waktu terpakai 35/90 menit. Biaya terpakai Rp60/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/3: Mengantar ke kelas. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Mobil bersama · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 90 menit dan Rp70 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 90 menit dan Rp80 dari Rp70 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Pengiriman prioritas · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 45 dari 90 menit dan Rp100 dari Rp70 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s1": {
        "state": "Waktu terpakai 20/90 menit. Biaya terpakai Rp15/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 2/3: Mengisi makanan. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 40 menit · Rp10 ribu",
            "next": "s10",
            "consequence": "Terpakai 60 dari 90 menit dan Rp25 dari Rp70 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantuan satu orang · 25 menit · Rp25 ribu",
            "next": "s11",
            "consequence": "Terpakai 45 dari 90 menit dan Rp40 dari Rp70 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Dua orang tambahan · 15 menit · Rp45 ribu",
            "next": "s12",
            "consequence": "Terpakai 35 dari 90 menit dan Rp60 dari Rp70 ribu.",
            "scores": [
              60,
              60,
              60,
              60
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s20": {
        "state": "Waktu terpakai 50/90 menit. Biaya terpakai Rp40/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/3: Mengantar ke kelas. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Mobil bersama · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 90 menit dan Rp50 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 90 menit dan Rp60 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Pengiriman prioritas · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 60 dari 90 menit dan Rp80 dari Rp70 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s21": {
        "state": "Waktu terpakai 35/90 menit. Biaya terpakai Rp55/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/3: Mengantar ke kelas. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Mobil bersama · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 90 menit dan Rp65 dari Rp70 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 90 menit dan Rp75 dari Rp70 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Pengiriman prioritas · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 45 dari 90 menit dan Rp95 dari Rp70 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s22": {
        "state": "Waktu terpakai 25/90 menit. Biaya terpakai Rp75/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/3: Mengantar ke kelas. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Mobil bersama · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 90 menit dan Rp85 dari Rp70 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 45 dari 90 menit dan Rp95 dari Rp70 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Pengiriman prioritas · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 35 dari 90 menit dan Rp115 dari Rp70 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s2": {
        "state": "Waktu terpakai 10/90 menit. Biaya terpakai Rp30/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 2/3: Mengisi makanan. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 40 menit · Rp10 ribu",
            "next": "s20",
            "consequence": "Terpakai 50 dari 90 menit dan Rp40 dari Rp70 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantuan satu orang · 25 menit · Rp25 ribu",
            "next": "s21",
            "consequence": "Terpakai 35 dari 90 menit dan Rp55 dari Rp70 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Dua orang tambahan · 15 menit · Rp45 ribu",
            "next": "s22",
            "consequence": "Terpakai 25 dari 90 menit dan Rp75 dari Rp70 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s": {
        "state": "Waktu terpakai 0/90 menit. Biaya terpakai Rp0/Rp70 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil kotak: Ambil sendiri (30 menit, Rp5 ribu), Kurir reguler (20 menit, Rp15 ribu), Kurir cepat (10 menit, Rp30 ribu). Mengisi makanan: Kerja sendiri (40 menit, Rp10 ribu), Bantuan satu orang (25 menit, Rp25 ribu), Dua orang tambahan (15 menit, Rp45 ribu). Mengantar ke kelas: Mobil bersama (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Pengiriman prioritas (10 menit, Rp40 ribu).",
        "prompt": "Tahap 1/3: Mengambil kotak. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Ambil sendiri · 30 menit · Rp5 ribu",
            "next": "s0",
            "consequence": "Terpakai 30 dari 90 menit dan Rp5 dari Rp70 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir reguler · 20 menit · Rp15 ribu",
            "next": "s1",
            "consequence": "Terpakai 20 dari 90 menit dan Rp15 dari Rp70 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir cepat · 10 menit · Rp30 ribu",
            "next": "s2",
            "consequence": "Terpakai 10 dari 90 menit dan Rp30 dari Rp70 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      }
    }
  },
  {
    "id": "oct26-st-buku",
    "level": "hard",
    "title": "Empat Tahap Pesanan Buku",
    "category": "Perencanaan sumber daya",
    "objective": "Selesaikan semua tahap dalam 120 menit dengan biaya maksimal Rp100 ribu. Di antara rencana yang memenuhi keduanya, pilih total biaya terendah. Jika sasaran sudah tak mungkin, minimalkan keterlambatan, lalu kelebihan biaya, lalu biaya total.",
    "start": "s",
    "nodes": {
      "s000": {
        "state": "Waktu terpakai 110/120 menit. Biaya terpakai Rp25/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 140 dari 120 menit dan Rp35 dari Rp100 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 130 dari 120 menit dan Rp45 dari Rp100 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 120 dari 120 menit dan Rp60 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          }
        ]
      },
      "s001": {
        "state": "Waktu terpakai 95/120 menit. Biaya terpakai Rp40/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 125 dari 120 menit dan Rp50 dari Rp100 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 115 dari 120 menit dan Rp60 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 105 dari 120 menit dan Rp75 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s002": {
        "state": "Waktu terpakai 85/120 menit. Biaya terpakai Rp60/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 115 dari 120 menit dan Rp70 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 105 dari 120 menit dan Rp80 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 120 menit dan Rp95 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s00": {
        "state": "Waktu terpakai 75/120 menit. Biaya terpakai Rp20/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 3/4: Menjilid. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Jilid sendiri · 35 menit · Rp5 ribu",
            "next": "s000",
            "consequence": "Terpakai 110 dari 120 menit dan Rp25 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantuan staf · 20 menit · Rp20 ribu",
            "next": "s001",
            "consequence": "Terpakai 95 dari 120 menit dan Rp40 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Tim khusus · 10 menit · Rp40 ribu",
            "next": "s002",
            "consequence": "Terpakai 85 dari 120 menit dan Rp60 dari Rp100 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s010": {
        "state": "Waktu terpakai 90/120 menit. Biaya terpakai Rp45/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 120 dari 120 menit dan Rp55 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 110 dari 120 menit dan Rp65 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 100 dari 120 menit dan Rp80 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s011": {
        "state": "Waktu terpakai 75/120 menit. Biaya terpakai Rp60/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 105 dari 120 menit dan Rp70 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 120 menit dan Rp80 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 120 menit dan Rp95 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s012": {
        "state": "Waktu terpakai 65/120 menit. Biaya terpakai Rp80/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 120 menit dan Rp90 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 120 menit dan Rp100 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 120 menit dan Rp115 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s01": {
        "state": "Waktu terpakai 55/120 menit. Biaya terpakai Rp40/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 3/4: Menjilid. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Jilid sendiri · 35 menit · Rp5 ribu",
            "next": "s010",
            "consequence": "Terpakai 90 dari 120 menit dan Rp45 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantuan staf · 20 menit · Rp20 ribu",
            "next": "s011",
            "consequence": "Terpakai 75 dari 120 menit dan Rp60 dari Rp100 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim khusus · 10 menit · Rp40 ribu",
            "next": "s012",
            "consequence": "Terpakai 65 dari 120 menit dan Rp80 dari Rp100 ribu.",
            "scores": [
              60,
              60,
              60,
              60
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s020": {
        "state": "Waktu terpakai 80/120 menit. Biaya terpakai Rp70/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 110 dari 120 menit dan Rp80 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 100 dari 120 menit dan Rp90 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 120 menit dan Rp105 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s021": {
        "state": "Waktu terpakai 65/120 menit. Biaya terpakai Rp85/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 120 menit dan Rp95 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 120 menit dan Rp105 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 120 menit dan Rp120 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s022": {
        "state": "Waktu terpakai 55/120 menit. Biaya terpakai Rp105/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 120 menit dan Rp115 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 120 menit dan Rp125 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 120 menit dan Rp140 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s02": {
        "state": "Waktu terpakai 45/120 menit. Biaya terpakai Rp65/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 3/4: Menjilid. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Jilid sendiri · 35 menit · Rp5 ribu",
            "next": "s020",
            "consequence": "Terpakai 80 dari 120 menit dan Rp70 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantuan staf · 20 menit · Rp20 ribu",
            "next": "s021",
            "consequence": "Terpakai 65 dari 120 menit dan Rp85 dari Rp100 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim khusus · 10 menit · Rp40 ribu",
            "next": "s022",
            "consequence": "Terpakai 55 dari 120 menit dan Rp105 dari Rp100 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s0": {
        "state": "Waktu terpakai 30/120 menit. Biaya terpakai Rp0/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 2/4: Mencetak. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Mesin reguler · 45 menit · Rp20 ribu",
            "next": "s00",
            "consequence": "Terpakai 75 dari 120 menit dan Rp20 dari Rp100 ribu.",
            "scores": [
              90,
              90,
              90,
              90
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Mesin cepat · 25 menit · Rp40 ribu",
            "next": "s01",
            "consequence": "Terpakai 55 dari 120 menit dan Rp40 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Mitra ekspres · 15 menit · Rp65 ribu",
            "next": "s02",
            "consequence": "Terpakai 45 dari 120 menit dan Rp65 dari Rp100 ribu.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s100": {
        "state": "Waktu terpakai 95/120 menit. Biaya terpakai Rp40/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 125 dari 120 menit dan Rp50 dari Rp100 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 115 dari 120 menit dan Rp60 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 105 dari 120 menit dan Rp75 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s101": {
        "state": "Waktu terpakai 80/120 menit. Biaya terpakai Rp55/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 110 dari 120 menit dan Rp65 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 100 dari 120 menit dan Rp75 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 120 menit dan Rp90 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s102": {
        "state": "Waktu terpakai 70/120 menit. Biaya terpakai Rp75/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 100 dari 120 menit dan Rp85 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 120 menit dan Rp95 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 120 menit dan Rp110 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s10": {
        "state": "Waktu terpakai 60/120 menit. Biaya terpakai Rp35/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 3/4: Menjilid. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Jilid sendiri · 35 menit · Rp5 ribu",
            "next": "s100",
            "consequence": "Terpakai 95 dari 120 menit dan Rp40 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantuan staf · 20 menit · Rp20 ribu",
            "next": "s101",
            "consequence": "Terpakai 80 dari 120 menit dan Rp55 dari Rp100 ribu.",
            "scores": [
              90,
              90,
              90,
              90
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim khusus · 10 menit · Rp40 ribu",
            "next": "s102",
            "consequence": "Terpakai 70 dari 120 menit dan Rp75 dari Rp100 ribu.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s110": {
        "state": "Waktu terpakai 75/120 menit. Biaya terpakai Rp60/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 105 dari 120 menit dan Rp70 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 120 menit dan Rp80 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 120 menit dan Rp95 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s111": {
        "state": "Waktu terpakai 60/120 menit. Biaya terpakai Rp75/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 120 menit dan Rp85 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 120 menit dan Rp95 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 120 menit dan Rp110 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s112": {
        "state": "Waktu terpakai 50/120 menit. Biaya terpakai Rp95/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 120 menit dan Rp105 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 120 menit dan Rp115 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 60 dari 120 menit dan Rp130 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s11": {
        "state": "Waktu terpakai 40/120 menit. Biaya terpakai Rp55/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 3/4: Menjilid. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Jilid sendiri · 35 menit · Rp5 ribu",
            "next": "s110",
            "consequence": "Terpakai 75 dari 120 menit dan Rp60 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantuan staf · 20 menit · Rp20 ribu",
            "next": "s111",
            "consequence": "Terpakai 60 dari 120 menit dan Rp75 dari Rp100 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim khusus · 10 menit · Rp40 ribu",
            "next": "s112",
            "consequence": "Terpakai 50 dari 120 menit dan Rp95 dari Rp100 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s120": {
        "state": "Waktu terpakai 65/120 menit. Biaya terpakai Rp85/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 120 menit dan Rp95 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 120 menit dan Rp105 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 120 menit dan Rp120 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s121": {
        "state": "Waktu terpakai 50/120 menit. Biaya terpakai Rp100/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 120 menit dan Rp110 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 120 menit dan Rp120 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 60 dari 120 menit dan Rp135 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s122": {
        "state": "Waktu terpakai 40/120 menit. Biaya terpakai Rp120/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 120 menit dan Rp130 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 60 dari 120 menit dan Rp140 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 50 dari 120 menit dan Rp155 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s12": {
        "state": "Waktu terpakai 30/120 menit. Biaya terpakai Rp80/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 3/4: Menjilid. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Jilid sendiri · 35 menit · Rp5 ribu",
            "next": "s120",
            "consequence": "Terpakai 65 dari 120 menit dan Rp85 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantuan staf · 20 menit · Rp20 ribu",
            "next": "s121",
            "consequence": "Terpakai 50 dari 120 menit dan Rp100 dari Rp100 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim khusus · 10 menit · Rp40 ribu",
            "next": "s122",
            "consequence": "Terpakai 40 dari 120 menit dan Rp120 dari Rp100 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s1": {
        "state": "Waktu terpakai 15/120 menit. Biaya terpakai Rp15/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 2/4: Mencetak. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Mesin reguler · 45 menit · Rp20 ribu",
            "next": "s10",
            "consequence": "Terpakai 60 dari 120 menit dan Rp35 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Mesin cepat · 25 menit · Rp40 ribu",
            "next": "s11",
            "consequence": "Terpakai 40 dari 120 menit dan Rp55 dari Rp100 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Mitra ekspres · 15 menit · Rp65 ribu",
            "next": "s12",
            "consequence": "Terpakai 30 dari 120 menit dan Rp80 dari Rp100 ribu.",
            "scores": [
              60,
              60,
              60,
              60
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s200": {
        "state": "Waktu terpakai 90/120 menit. Biaya terpakai Rp55/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 120 dari 120 menit dan Rp65 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 110 dari 120 menit dan Rp75 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 100 dari 120 menit dan Rp90 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s201": {
        "state": "Waktu terpakai 75/120 menit. Biaya terpakai Rp70/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 105 dari 120 menit dan Rp80 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 120 menit dan Rp90 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 120 menit dan Rp105 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s202": {
        "state": "Waktu terpakai 65/120 menit. Biaya terpakai Rp90/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 120 menit dan Rp100 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 120 menit dan Rp110 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 120 menit dan Rp125 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s20": {
        "state": "Waktu terpakai 55/120 menit. Biaya terpakai Rp50/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 3/4: Menjilid. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Jilid sendiri · 35 menit · Rp5 ribu",
            "next": "s200",
            "consequence": "Terpakai 90 dari 120 menit dan Rp55 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantuan staf · 20 menit · Rp20 ribu",
            "next": "s201",
            "consequence": "Terpakai 75 dari 120 menit dan Rp70 dari Rp100 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim khusus · 10 menit · Rp40 ribu",
            "next": "s202",
            "consequence": "Terpakai 65 dari 120 menit dan Rp90 dari Rp100 ribu.",
            "scores": [
              60,
              60,
              60,
              60
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s210": {
        "state": "Waktu terpakai 70/120 menit. Biaya terpakai Rp75/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 100 dari 120 menit dan Rp85 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 120 menit dan Rp95 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 120 menit dan Rp110 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s211": {
        "state": "Waktu terpakai 55/120 menit. Biaya terpakai Rp90/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 120 menit dan Rp100 dari Rp100 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 120 menit dan Rp110 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 120 menit dan Rp125 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s212": {
        "state": "Waktu terpakai 45/120 menit. Biaya terpakai Rp110/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 120 menit dan Rp120 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 120 menit dan Rp130 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 120 menit dan Rp145 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s21": {
        "state": "Waktu terpakai 35/120 menit. Biaya terpakai Rp70/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 3/4: Menjilid. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Jilid sendiri · 35 menit · Rp5 ribu",
            "next": "s210",
            "consequence": "Terpakai 70 dari 120 menit dan Rp75 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantuan staf · 20 menit · Rp20 ribu",
            "next": "s211",
            "consequence": "Terpakai 55 dari 120 menit dan Rp90 dari Rp100 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim khusus · 10 menit · Rp40 ribu",
            "next": "s212",
            "consequence": "Terpakai 45 dari 120 menit dan Rp110 dari Rp100 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s220": {
        "state": "Waktu terpakai 60/120 menit. Biaya terpakai Rp100/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 120 menit dan Rp110 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 120 menit dan Rp120 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 120 menit dan Rp135 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s221": {
        "state": "Waktu terpakai 45/120 menit. Biaya terpakai Rp115/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 120 menit dan Rp125 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 120 menit dan Rp135 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 120 menit dan Rp150 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s222": {
        "state": "Waktu terpakai 35/120 menit. Biaya terpakai Rp135/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 4/4: Mengirim. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Rute gabungan · 30 menit · Rp10 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 120 menit dan Rp145 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Kurir langsung · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 120 menit dan Rp155 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp35 ribu",
            "next": null,
            "consequence": "Terpakai 45 dari 120 menit dan Rp170 dari Rp100 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s22": {
        "state": "Waktu terpakai 25/120 menit. Biaya terpakai Rp95/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 3/4: Menjilid. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Jilid sendiri · 35 menit · Rp5 ribu",
            "next": "s220",
            "consequence": "Terpakai 60 dari 120 menit dan Rp100 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Bantuan staf · 20 menit · Rp20 ribu",
            "next": "s221",
            "consequence": "Terpakai 45 dari 120 menit dan Rp115 dari Rp100 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim khusus · 10 menit · Rp40 ribu",
            "next": "s222",
            "consequence": "Terpakai 35 dari 120 menit dan Rp135 dari Rp100 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s2": {
        "state": "Waktu terpakai 10/120 menit. Biaya terpakai Rp30/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 2/4: Mencetak. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Mesin reguler · 45 menit · Rp20 ribu",
            "next": "s20",
            "consequence": "Terpakai 55 dari 120 menit dan Rp50 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Mesin cepat · 25 menit · Rp40 ribu",
            "next": "s21",
            "consequence": "Terpakai 35 dari 120 menit dan Rp70 dari Rp100 ribu.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Mitra ekspres · 15 menit · Rp65 ribu",
            "next": "s22",
            "consequence": "Terpakai 25 dari 120 menit dan Rp95 dari Rp100 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s": {
        "state": "Waktu terpakai 0/120 menit. Biaya terpakai Rp0/Rp100 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Memeriksa berkas: Pemeriksaan manual (30 menit, Rp0 ribu), Operator tambahan (15 menit, Rp15 ribu), Layanan prioritas (10 menit, Rp30 ribu). Mencetak: Mesin reguler (45 menit, Rp20 ribu), Mesin cepat (25 menit, Rp40 ribu), Mitra ekspres (15 menit, Rp65 ribu). Menjilid: Jilid sendiri (35 menit, Rp5 ribu), Bantuan staf (20 menit, Rp20 ribu), Tim khusus (10 menit, Rp40 ribu). Mengirim: Rute gabungan (30 menit, Rp10 ribu), Kurir langsung (20 menit, Rp20 ribu), Layanan prioritas (10 menit, Rp35 ribu).",
        "prompt": "Tahap 1/4: Memeriksa berkas. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Pemeriksaan manual · 30 menit · Rp0 ribu",
            "next": "s0",
            "consequence": "Terpakai 30 dari 120 menit dan Rp0 dari Rp100 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Operator tambahan · 15 menit · Rp15 ribu",
            "next": "s1",
            "consequence": "Terpakai 15 dari 120 menit dan Rp15 dari Rp100 ribu.",
            "scores": [
              90,
              90,
              90,
              90
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Layanan prioritas · 10 menit · Rp30 ribu",
            "next": "s2",
            "consequence": "Terpakai 10 dari 120 menit dan Rp30 dari Rp100 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      }
    }
  },
  {
    "id": "oct26-st-peralatan",
    "level": "hard",
    "title": "Peralatan Siap Sebelum Acara",
    "category": "Perencanaan sumber daya",
    "objective": "Selesaikan semua tahap dalam 110 menit dengan biaya maksimal Rp95 ribu. Di antara rencana yang memenuhi keduanya, pilih total biaya terendah. Jika sasaran sudah tak mungkin, minimalkan keterlambatan, lalu kelebihan biaya, lalu biaya total.",
    "start": "s",
    "nodes": {
      "s000": {
        "state": "Waktu terpakai 95/110 menit. Biaya terpakai Rp5/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 130 dari 110 menit dan Rp5 dari Rp95 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 115 dari 110 menit dan Rp25 dari Rp95 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 105 dari 110 menit dan Rp45 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          }
        ]
      },
      "s001": {
        "state": "Waktu terpakai 85/110 menit. Biaya terpakai Rp15/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 120 dari 110 menit dan Rp15 dari Rp95 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 105 dari 110 menit dan Rp35 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 110 menit dan Rp55 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s002": {
        "state": "Waktu terpakai 75/110 menit. Biaya terpakai Rp30/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 110 dari 110 menit dan Rp30 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 110 menit dan Rp50 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 110 menit dan Rp70 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s00": {
        "state": "Waktu terpakai 65/110 menit. Biaya terpakai Rp0/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/4: Menguji suara. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Cek lengkap manual · 30 menit · Rp5 ribu",
            "next": "s000",
            "consequence": "Terpakai 95 dari 110 menit dan Rp5 dari Rp95 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi cepat · 20 menit · Rp15 ribu",
            "next": "s001",
            "consequence": "Terpakai 85 dari 110 menit dan Rp15 dari Rp95 ribu.",
            "scores": [
              90,
              90,
              90,
              90
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp30 ribu",
            "next": "s002",
            "consequence": "Terpakai 75 dari 110 menit dan Rp30 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          }
        ]
      },
      "s010": {
        "state": "Waktu terpakai 80/110 menit. Biaya terpakai Rp25/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 115 dari 110 menit dan Rp25 dari Rp95 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 100 dari 110 menit dan Rp45 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 110 menit dan Rp65 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s011": {
        "state": "Waktu terpakai 70/110 menit. Biaya terpakai Rp35/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 105 dari 110 menit dan Rp35 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 110 menit dan Rp55 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 110 menit dan Rp75 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s012": {
        "state": "Waktu terpakai 60/110 menit. Biaya terpakai Rp50/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 110 menit dan Rp50 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 110 menit dan Rp70 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 110 menit dan Rp90 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s01": {
        "state": "Waktu terpakai 50/110 menit. Biaya terpakai Rp20/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/4: Menguji suara. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Cek lengkap manual · 30 menit · Rp5 ribu",
            "next": "s010",
            "consequence": "Terpakai 80 dari 110 menit dan Rp25 dari Rp95 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi cepat · 20 menit · Rp15 ribu",
            "next": "s011",
            "consequence": "Terpakai 70 dari 110 menit dan Rp35 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp30 ribu",
            "next": "s012",
            "consequence": "Terpakai 60 dari 110 menit dan Rp50 dari Rp95 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s020": {
        "state": "Waktu terpakai 70/110 menit. Biaya terpakai Rp45/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 105 dari 110 menit dan Rp45 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 110 menit dan Rp65 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 110 menit dan Rp85 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s021": {
        "state": "Waktu terpakai 60/110 menit. Biaya terpakai Rp55/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 110 menit dan Rp55 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 110 menit dan Rp75 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 110 menit dan Rp95 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s022": {
        "state": "Waktu terpakai 50/110 menit. Biaya terpakai Rp70/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 110 menit dan Rp70 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 110 menit dan Rp90 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 60 dari 110 menit dan Rp110 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s02": {
        "state": "Waktu terpakai 40/110 menit. Biaya terpakai Rp40/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/4: Menguji suara. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Cek lengkap manual · 30 menit · Rp5 ribu",
            "next": "s020",
            "consequence": "Terpakai 70 dari 110 menit dan Rp45 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 20 menit · Rp15 ribu",
            "next": "s021",
            "consequence": "Terpakai 60 dari 110 menit dan Rp55 dari Rp95 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp30 ribu",
            "next": "s022",
            "consequence": "Terpakai 50 dari 110 menit dan Rp70 dari Rp95 ribu.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s0": {
        "state": "Waktu terpakai 30/110 menit. Biaya terpakai Rp0/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 2/4: Memasang layar. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Pasang sendiri · 35 menit · Rp0 ribu",
            "next": "s00",
            "consequence": "Terpakai 65 dari 110 menit dan Rp0 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Satu asisten · 20 menit · Rp20 ribu",
            "next": "s01",
            "consequence": "Terpakai 50 dari 110 menit dan Rp20 dari Rp95 ribu.",
            "scores": [
              90,
              90,
              90,
              90
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim pemasangan · 10 menit · Rp40 ribu",
            "next": "s02",
            "consequence": "Terpakai 40 dari 110 menit dan Rp40 dari Rp95 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s100": {
        "state": "Waktu terpakai 80/110 menit. Biaya terpakai Rp25/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 115 dari 110 menit dan Rp25 dari Rp95 ribu. Sasaran gagal: melewati waktu. ",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 100 dari 110 menit dan Rp45 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 110 menit dan Rp65 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s101": {
        "state": "Waktu terpakai 70/110 menit. Biaya terpakai Rp35/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 105 dari 110 menit dan Rp35 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 110 menit dan Rp55 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 110 menit dan Rp75 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s102": {
        "state": "Waktu terpakai 60/110 menit. Biaya terpakai Rp50/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 110 menit dan Rp50 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 110 menit dan Rp70 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 110 menit dan Rp90 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s10": {
        "state": "Waktu terpakai 50/110 menit. Biaya terpakai Rp20/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/4: Menguji suara. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Cek lengkap manual · 30 menit · Rp5 ribu",
            "next": "s100",
            "consequence": "Terpakai 80 dari 110 menit dan Rp25 dari Rp95 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi cepat · 20 menit · Rp15 ribu",
            "next": "s101",
            "consequence": "Terpakai 70 dari 110 menit dan Rp35 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp30 ribu",
            "next": "s102",
            "consequence": "Terpakai 60 dari 110 menit dan Rp50 dari Rp95 ribu.",
            "scores": [
              80,
              80,
              80,
              80
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s110": {
        "state": "Waktu terpakai 65/110 menit. Biaya terpakai Rp45/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 100 dari 110 menit dan Rp45 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 110 menit dan Rp65 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 110 menit dan Rp85 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s111": {
        "state": "Waktu terpakai 55/110 menit. Biaya terpakai Rp55/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 110 menit dan Rp55 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 110 menit dan Rp75 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 110 menit dan Rp95 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s112": {
        "state": "Waktu terpakai 45/110 menit. Biaya terpakai Rp70/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 110 menit dan Rp70 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 110 menit dan Rp90 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 110 menit dan Rp110 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s11": {
        "state": "Waktu terpakai 35/110 menit. Biaya terpakai Rp40/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/4: Menguji suara. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Cek lengkap manual · 30 menit · Rp5 ribu",
            "next": "s110",
            "consequence": "Terpakai 65 dari 110 menit dan Rp45 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 20 menit · Rp15 ribu",
            "next": "s111",
            "consequence": "Terpakai 55 dari 110 menit dan Rp55 dari Rp95 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp30 ribu",
            "next": "s112",
            "consequence": "Terpakai 45 dari 110 menit dan Rp70 dari Rp95 ribu.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s120": {
        "state": "Waktu terpakai 55/110 menit. Biaya terpakai Rp65/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 110 menit dan Rp65 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 110 menit dan Rp85 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 110 menit dan Rp105 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s121": {
        "state": "Waktu terpakai 45/110 menit. Biaya terpakai Rp75/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 110 menit dan Rp75 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 110 menit dan Rp95 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 110 menit dan Rp115 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s122": {
        "state": "Waktu terpakai 35/110 menit. Biaya terpakai Rp90/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 110 menit dan Rp90 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 55 dari 110 menit dan Rp110 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 45 dari 110 menit dan Rp130 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s12": {
        "state": "Waktu terpakai 25/110 menit. Biaya terpakai Rp60/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/4: Menguji suara. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Cek lengkap manual · 30 menit · Rp5 ribu",
            "next": "s120",
            "consequence": "Terpakai 55 dari 110 menit dan Rp65 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 20 menit · Rp15 ribu",
            "next": "s121",
            "consequence": "Terpakai 45 dari 110 menit dan Rp75 dari Rp95 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp30 ribu",
            "next": "s122",
            "consequence": "Terpakai 35 dari 110 menit dan Rp90 dari Rp95 ribu.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s1": {
        "state": "Waktu terpakai 15/110 menit. Biaya terpakai Rp20/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 2/4: Memasang layar. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Pasang sendiri · 35 menit · Rp0 ribu",
            "next": "s10",
            "consequence": "Terpakai 50 dari 110 menit dan Rp20 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Satu asisten · 20 menit · Rp20 ribu",
            "next": "s11",
            "consequence": "Terpakai 35 dari 110 menit dan Rp40 dari Rp95 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim pemasangan · 10 menit · Rp40 ribu",
            "next": "s12",
            "consequence": "Terpakai 25 dari 110 menit dan Rp60 dari Rp95 ribu.",
            "scores": [
              65,
              65,
              65,
              65
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s200": {
        "state": "Waktu terpakai 75/110 menit. Biaya terpakai Rp40/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 110 dari 110 menit dan Rp40 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 110 menit dan Rp60 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 110 menit dan Rp80 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s201": {
        "state": "Waktu terpakai 65/110 menit. Biaya terpakai Rp50/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 100 dari 110 menit dan Rp50 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 110 menit dan Rp70 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 110 menit dan Rp90 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s202": {
        "state": "Waktu terpakai 55/110 menit. Biaya terpakai Rp65/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 90 dari 110 menit dan Rp65 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 110 menit dan Rp85 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 110 menit dan Rp105 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s20": {
        "state": "Waktu terpakai 45/110 menit. Biaya terpakai Rp35/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/4: Menguji suara. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Cek lengkap manual · 30 menit · Rp5 ribu",
            "next": "s200",
            "consequence": "Terpakai 75 dari 110 menit dan Rp40 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 20 menit · Rp15 ribu",
            "next": "s201",
            "consequence": "Terpakai 65 dari 110 menit dan Rp50 dari Rp95 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp30 ribu",
            "next": "s202",
            "consequence": "Terpakai 55 dari 110 menit dan Rp65 dari Rp95 ribu.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s210": {
        "state": "Waktu terpakai 60/110 menit. Biaya terpakai Rp60/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 95 dari 110 menit dan Rp60 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 80 dari 110 menit dan Rp80 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 110 menit dan Rp100 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s211": {
        "state": "Waktu terpakai 50/110 menit. Biaya terpakai Rp70/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 110 menit dan Rp70 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 110 menit dan Rp90 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 60 dari 110 menit dan Rp110 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s212": {
        "state": "Waktu terpakai 40/110 menit. Biaya terpakai Rp85/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 110 menit dan Rp85 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 60 dari 110 menit dan Rp105 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 50 dari 110 menit dan Rp125 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s21": {
        "state": "Waktu terpakai 30/110 menit. Biaya terpakai Rp55/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/4: Menguji suara. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Cek lengkap manual · 30 menit · Rp5 ribu",
            "next": "s210",
            "consequence": "Terpakai 60 dari 110 menit dan Rp60 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 20 menit · Rp15 ribu",
            "next": "s211",
            "consequence": "Terpakai 50 dari 110 menit dan Rp70 dari Rp95 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp30 ribu",
            "next": "s212",
            "consequence": "Terpakai 40 dari 110 menit dan Rp85 dari Rp95 ribu.",
            "scores": [
              70,
              70,
              70,
              70
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s220": {
        "state": "Waktu terpakai 50/110 menit. Biaya terpakai Rp80/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 85 dari 110 menit dan Rp80 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 70 dari 110 menit dan Rp100 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 60 dari 110 menit dan Rp120 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s221": {
        "state": "Waktu terpakai 40/110 menit. Biaya terpakai Rp90/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 75 dari 110 menit dan Rp90 dari Rp95 ribu. Sasaran waktu dan anggaran terpenuhi.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 60 dari 110 menit dan Rp110 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 50 dari 110 menit dan Rp130 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s222": {
        "state": "Waktu terpakai 30/110 menit. Biaya terpakai Rp105/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 4/4: Menata kursi. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Kerja sendiri · 35 menit · Rp0 ribu",
            "next": null,
            "consequence": "Terpakai 65 dari 110 menit dan Rp105 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Dua relawan berbayar · 20 menit · Rp20 ribu",
            "next": null,
            "consequence": "Terpakai 50 dari 110 menit dan Rp125 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim logistik · 10 menit · Rp40 ribu",
            "next": null,
            "consequence": "Terpakai 40 dari 110 menit dan Rp145 dari Rp95 ribu. Sasaran gagal: melewati anggaran.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s22": {
        "state": "Waktu terpakai 20/110 menit. Biaya terpakai Rp75/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 3/4: Menguji suara. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Cek lengkap manual · 30 menit · Rp5 ribu",
            "next": "s220",
            "consequence": "Terpakai 50 dari 110 menit dan Rp80 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Teknisi cepat · 20 menit · Rp15 ribu",
            "next": "s221",
            "consequence": "Terpakai 40 dari 110 menit dan Rp90 dari Rp95 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Teknisi prioritas · 10 menit · Rp30 ribu",
            "next": "s222",
            "consequence": "Terpakai 30 dari 110 menit dan Rp105 dari Rp95 ribu.",
            "scores": [
              10,
              10,
              10,
              10
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s2": {
        "state": "Waktu terpakai 10/110 menit. Biaya terpakai Rp35/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 2/4: Memasang layar. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Pasang sendiri · 35 menit · Rp0 ribu",
            "next": "s20",
            "consequence": "Terpakai 45 dari 110 menit dan Rp35 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Satu asisten · 20 menit · Rp20 ribu",
            "next": "s21",
            "consequence": "Terpakai 30 dari 110 menit dan Rp55 dari Rp95 ribu.",
            "scores": [
              75,
              75,
              75,
              75
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Tim pemasangan · 10 menit · Rp40 ribu",
            "next": "s22",
            "consequence": "Terpakai 20 dari 110 menit dan Rp75 dari Rp95 ribu.",
            "scores": [
              55,
              55,
              55,
              55
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      },
      "s": {
        "state": "Waktu terpakai 0/110 menit. Biaya terpakai Rp0/Rp95 ribu. Semua tahap wajib dilakukan berurutan. Semua durasi dan biaya pasti; tidak ada biaya lain. Rencana lengkap: Mengambil proyektor: Berjalan kaki (30 menit, Rp0 ribu), Ojek (15 menit, Rp20 ribu), Mobil sewa (10 menit, Rp35 ribu). Memasang layar: Pasang sendiri (35 menit, Rp0 ribu), Satu asisten (20 menit, Rp20 ribu), Tim pemasangan (10 menit, Rp40 ribu). Menguji suara: Cek lengkap manual (30 menit, Rp5 ribu), Teknisi cepat (20 menit, Rp15 ribu), Teknisi prioritas (10 menit, Rp30 ribu). Menata kursi: Kerja sendiri (35 menit, Rp0 ribu), Dua relawan berbayar (20 menit, Rp20 ribu), Tim logistik (10 menit, Rp40 ribu).",
        "prompt": "Tahap 1/4: Mengambil proyektor. Pilih cara yang menjaga seluruh sasaran.",
        "choices": [
          {
            "text": "Berjalan kaki · 30 menit · Rp0 ribu",
            "next": "s0",
            "consequence": "Terpakai 30 dari 110 menit dan Rp0 dari Rp95 ribu.",
            "scores": [
              100,
              100,
              100,
              100
            ],
            "best": true,
            "analysis": "Pilihan ini mempertahankan hasil terbaik yang masih mungkin: penuhi tenggat dan anggaran, lalu minimalkan pengeluaran."
          },
          {
            "text": "Ojek · 15 menit · Rp20 ribu",
            "next": "s1",
            "consequence": "Terpakai 15 dari 110 menit dan Rp20 dari Rp95 ribu.",
            "scores": [
              90,
              90,
              90,
              90
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          },
          {
            "text": "Mobil sewa · 10 menit · Rp35 ribu",
            "next": "s2",
            "consequence": "Terpakai 10 dari 110 menit dan Rp35 dari Rp95 ribu.",
            "scores": [
              85,
              85,
              85,
              85
            ],
            "best": false,
            "analysis": "Pilihan ini memperburuk hasil terbaik yang masih mungkin dari keadaan saat ini. Hitung kebutuhan tahap tersisa sebelum menghabiskan waktu atau anggaran."
          }
        ]
      }
    }
  }
]);
["easy","medium","hard"].forEach(function(level){STRATEGY_BANK[level]=STRATEGY_SCENARIOS.filter(function(x){return x.level===level;});});
