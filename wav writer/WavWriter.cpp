#include <fstream>
#include <string>
#include <cstdio>
#include <list>

using namespace std;

class SoundMaker {
public:
	virtual int PosAt(int time) {
		return 0;
	}
	virtual int annel(int time) {
		return PosAt(time);
	}
	virtual int RightChannel(int time) {
		return PosAt(time);
	}

};

class TriangleWave : public SoundMaker {
	int len;
	int volume;
	float step;
public:
	TriangleWave(int waveLen, int vol) {
		len = waveLen;
		volume = vol;
		step = vol * 2.0 / len;
	}

	int PosAt(int time) {
		time = time % len;
		int middle = len / 2;
		int distance = abs(time - middle);
		return volume - (distance * step);

	}
};

// Int to Chars;; a - wartosc do zapisu; b - dlugosc w bajtach
string ITC(int a, int b) {
	string str;
	/*Big endian not usefull
	int t;
	while (b > 0) {
		int t1 = b - 1;
		int t2 = t1 * 8;
		int t3 = a >> 8;
		t = t3;
		//t = a >> (8 * (b - 1));
		str.push_back((char)(a >> 8) % 256);
		a /= 256;
		b--;
	}*/

	while (b > 0) {
		str.push_back((char(a % 256)));
		a /= 256;
		b--;
	}
	return str;
}

string WriteHeader(int size) {
	string ret;
	ret.append("RIFF");
	ret.append(ITC(size + 31, 4)); //Filesize
	ret.append("WAVEfmt"); // WAV file, chunk start
	ret.append(ITC(0x20, 1)); // "fmt " powinno byæ a nie "fmt"
	ret.append(ITC(0x00000010, 4)); //"Rozmiar formatu danych" (chyba bits per cos)
	ret.append(ITC(0x0001, 2)); //"Typ formatu"
	ret.append(ITC(0x0001, 2)); //"Liczba kanalów"
	ret.append(ITC(0x00005622, 4)); //Czestotliwosc próbkowania (96 kHz moze?)
	ret.append(ITC(0x00005622, 4)); //Bytes per second (Liczba kanalów * Czestotliwosc próbkowania * rozmiar formatu(?) / 8)
	ret.append(ITC(0x0001, 2)); //Bytes per sample (2 powinno byæ ok)
	ret.append(ITC(0x0008, 2)); //Bits per sample
	ret.append("data"); //Poczatek danych
	ret.append(ITC(size, 4));
	return ret;
}

int GetSizeOfFile() {

	return 30000;
}

list<SoundMaker*> GetListOfSounds() {
	list<SoundMaker*> ret;
	TriangleWave *trg = new TriangleWave(60, 20);
	TriangleWave *trg2 = new TriangleWave(53, 20);
	ret.push_back(trg);
	ret.push_back(trg2);

	return ret;
}

string WriteData(int size) {
	string ret;
	
	list<SoundMaker*> sounds = GetListOfSounds();
	
	for (int i = 0; i < size; i++) {
		int position = 0x60;
		
		list<SoundMaker*>::iterator it;
		for (it = sounds.begin(); it != sounds.end(); ++it) {
			SoundMaker * sndMaker = *it;
			position += sndMaker->PosAt(i);
			ret.append(ITC(position, 1));
		}
	}
	return ret;
}


int main() {
	std::ofstream fout;
	std::string path = "C:\\Temp\\DING.WAV";


	fout.open(path, std::ios_base::binary | std::ios_base::out);
	if (!fout.is_open()) {
		throw ("Failed to open file");

	}
	int size = GetSizeOfFile();
	fout << WriteHeader(size);
	fout << WriteData(size);
	fout.close();
}


