const sozluk = new Set(turkishAdjectives.concat(turkishNouns));

function sozlukteBulunur(sozcuk) {
  return sozluk.has(sozcuk);
}

function ekiAl(sozcuk, ekUzunlugu) {
  return sozcuk.substring(sozcuk.length - ekUzunlugu);
}

function kokuAl(sozcuk, ekUzunlugu) {
  return sozcuk.substring(0, sozcuk.length - ekUzunlugu);
}

function kucukHarfeCevir(sozcuk) {
  const harfHaritasi = {
    "A": "a", "B": "B", "C": "C", "Ç": "Ç", "D": "d", 
    "E": "e", "F": "f", "G": "g", "Ğ": "ğ", "H": "h", 
    "I": "ı", "İ": "i", "J": "j", "K": "k", "L": "l", 
    "M": "m", "N": "n", "O": "o", "Ö": "ö", "P": "p", 
    "R": "r", "S": "s", "Ş": "ş", "T": "t", "U": "u", 
    "Ü": "ü", "V": "v", "Y": "y", "Z": "z", "Â": "â", 
    "Î": "î", "Û": "û",
  };
  let kucukHarfliSozcuk = "";
  for (let i = 0; i < sozcuk.length; i++) {
    const harf = sozcuk.charAt(i);
    const kucukHarf = harfHaritasi[harf];
    if (kucukHarf) {
      kucukHarfliSozcuk += kucukHarf;
    } else {
      kucukHarfliSozcuk += harf;
    }
  }
  return kucukHarfliSozcuk;
}

function sonSesliyiAl(sozcuk) {
  const sesliler = ["a", "e", "ı", "i", "o", "ö", "u", "ü", "â", "î", "û"];
  for (let i = sozcuk.length - 1; i >= 0; i--) {
    const harf = sozcuk.charAt(i);
    if (sesliler.includes(harf)) {
      return harf;
    }
  }
  return null;
}

function sonSesliDuzdur(sozcuk) {
  const duzSesliler = ["a", "e", "ı", "i", "â", "î"];
  const sonSesli = sonSesliyiAl(sozcuk);
  return duzSesliler.includes(sonSesli);
}

function sonSesliYuvarlaktir(sozcuk) {
  return !sonSesliDuzdur(sozcuk);
}

function sonSesliIncedir(sozcuk) {
  const inceSesliler = ["e", "i", "ö", "ü", "î"];
  const sonSesli = sonSesliyiAl(sozcuk);
  return inceSesliler.includes(sonSesli);
}

function sonSesliKalindir(sozcuk) {
  return !sonSesliIncedir(sozcuk);
}

function kaynastirmasizEktir(tamlamaEki) {
  return tamlamaEki.length == 1;
}

function sonHarfiKalinlastir(kok) {
  const kalinHarita = {
    "b": "p", 
    "c": "ç", 
    "d": "t", 
    "g": "k", 
    "ğ": "k"
  }

  const sonHarf = kok[kok.length-1];
  const kalinSonHarf = kalinHarita[sonHarf];

  if (kalinSonHarf !== undefined) {
    return kok.slice(0, -1) + kalinSonHarf;
  }
  else {
    return null;
  }
}

function tamlamaEkiniTemizleOzel(sozcuk, tamlamaEki, sekilUyumu, sesUyumu) {
  const ekUzunlugu = tamlamaEki.length;
  let ek = ekiAl(sozcuk, ekUzunlugu);
  let kok = kokuAl(sozcuk, ekUzunlugu);
  
  let kalinKok = sonHarfiKalinlastir(kok);

  if (ek === tamlamaEki && sekilUyumu(kok) && sesUyumu(kok)) {
    if (sozlukteBulunur(kok)) {
      return kok;
    }
    else if (kalinKok && sozlukteBulunur(kalinKok)) {
      return kalinKok;
    }
  }
  return null;
}

function tamlamaEkiniTemizle(sozcuk) {
  let temizSozcuk;
  temizSozcuk = tamlamaEkiniTemizleOzel(sozcuk, "i", sonSesliDuzdur, sonSesliIncedir);
  if (temizSozcuk) { return temizSozcuk };
  temizSozcuk = tamlamaEkiniTemizleOzel(sozcuk, "si", sonSesliDuzdur, sonSesliIncedir);
  if (temizSozcuk) { return temizSozcuk };
  temizSozcuk = tamlamaEkiniTemizleOzel(sozcuk, "ı", sonSesliDuzdur, sonSesliKalindir);
  if (temizSozcuk) { return temizSozcuk };
  temizSozcuk = tamlamaEkiniTemizleOzel(sozcuk, "sı", sonSesliDuzdur, sonSesliKalindir);
  if (temizSozcuk) { return temizSozcuk };
  temizSozcuk = tamlamaEkiniTemizleOzel(sozcuk, "u", sonSesliYuvarlaktir, sonSesliKalindir);
  if (temizSozcuk) { return temizSozcuk };
  temizSozcuk = tamlamaEkiniTemizleOzel(sozcuk, "su", sonSesliYuvarlaktir, sonSesliKalindir);
  if (temizSozcuk) { return temizSozcuk };
  temizSozcuk = tamlamaEkiniTemizleOzel(sozcuk, "ü", sonSesliYuvarlaktir, sonSesliIncedir);
  if (temizSozcuk) { return temizSozcuk };
  temizSozcuk = tamlamaEkiniTemizleOzel(sozcuk, "sü", sonSesliYuvarlaktir, sonSesliIncedir);
  if (temizSozcuk) { return temizSozcuk };
  return sozcuk;
}
