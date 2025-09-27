# cabinet
Plan SaaS management Clinica Stomatologica. 

Superadmin:
Creeaza si gestioneaza organizatii
Creeaza si gestioneaza ownerul pentru fiecare organizatie
Nu apare ca utilizator in organizatii


Owner:
Face parte dintr-o singura organizatie si are acces doar la acea organizatie
Are acces si gestioneaza doar organizatia din care face parte
Creeaza si gestioneaza useri in organizatie
Gestioneaza permisiunile userilor din organizatie
Creează si gestioneaza materielele din organizatie, inclusiv adaugarea de unitati de masura custom 
Creează si gestioneaza categoriile materialelor din organizatie
Poate modifica stocurile organizatiei
Creeaza si organizeaza categoriile lucrarilor organizatiei
Creeaza si organizeaza lucrarile din organizatie, inclusiv stabilirea preturilor fiecarei lucrari.
Poate vizualiza rapoartele lucrarilor si a consumurilor
Poate vizualiza si gestiona calendarul si programarile

Manager:
Poate adauga intrari de materiale
Poate vizualiza rapoartele lucrarilor si a consumurilor
Poate vizualiza si gestiona calendarul si programarile oricarui medic
Nu poate crea utilizatori
Poate vizualiza facturile emise (modul viitor)
Acces la dashboard Manager

Medic
Poate vizualiza si gestiona calendarul si programarile lui
Poate adauga lucrari executate din lista lucrarilor create de Owner. Nu poate crea lucrari suplimentare
Poate adauga in cadrul lucrarilor adaugate de el, materialele folosite la respectivele lucrari
Poate crea pacienti
Nu poate crea utilizatori
Poate emite facturi (modul viitor)
Acces la dashboard Medic

Asistent:
Poate crea și gestiona programări pentru toți medicii
Poate vizualiza calendarul tuturor medicilor (doar citire)
Poate înregistra pacienți noi
Poate vedea doar informații de bază ale pacienților (nume, telefon, programări)
Poate emite facturi
Acces la dashboard Asistent

Pacient (modul viitor)
Poate vizualiza istoricul tratamentelor
Contul pacientului se va crea cu adresa de email introdusa la introducerea pacientului de catre medic
Poate solicita stergerea contului
poate vizualiza programarile viitoare
Acces la dashboard Pacient


Mod de functionare:

1. Superadminul creaza organizatia
2. Superadminul creaza managerul organizatiei
3. Ownerul creaza userii organizatiei
4. Ownerul creaza categoriile materialelor
5. Ownerul creaza materialele
6. Ownerul Creaza Categoriile lucrarilor
7. Ownerul creaza lucrarile
8. Managerul introduce intrarile de materiale
9. Medicul Creaza pacientul
10. Medicul introduce lucrarea efectuata, selectand pacientul la care a fost efectuata si adauga in cadrul lucrarii, materielele pe care le-a folosit
11. Medicul poate face o programare viitoare pentru un pacient
12. Managerul sau executivul poate vizualiza lucrarile efectuate de fiecare medic, totalul materialelor folosite pentru fiecare lucrare, totalul materialelor folosite pentru o perioada de timp, pretul fiecarei lucrari si totalul preturilor pentru toate lucrarile efectuate intr-o anumita perioada de timp. 

Observatii:
Stocul de materiale se tine FIFO si poate fi negativ
SaaS prietenos si modular, cu posibilitatea adaugarii de noi module
Audit (cine a schimbat ce), export CSV/PDF
platforma 100% functionala si sa se incadreze in freetire Proiectul se va numi pe supabase si pe github "cabinet"
Interfață touch-friendly pentru tablete
Evidență fiscală (pentru România - integrare cu ANAF în viitor)
Quick actions pe dashboard (programare rapidă, pacient nou, stoc scăzut) in functie de user
Search global (caută rapid pacient, lucrare, material)
La adaugarea unei lucrari se vor adauga si cantitatea de materiale folosite. Materialele se vor putea cauta dupa categorii, nume sau search global

1. Sistem de Notificări:
•	Notificări pentru stoc scăzut de materiale
•	Reminder-uri pentru programări (pentru pacienți și medici)
•	Notificări pentru programări anulate/modificate

2. Gestionare Avansată Pacienți:
•	Istoric medical complet
•	Fotografii înainte/după (pentru lucrări estetice)
•	Consent-uri și documente medicale
•	Sistem de comunicare (SMS/email pentru confirmări)

3. Dashboard și Raportare Îmbunătățită:
•	Grafice vizuale pentru venituri, programări, materiale folosite
•	Rapoarte comparative pe luni/ani
•	Export în Excel, nu doar CSV/PDF
•	Rapoarte de profitabilitate pe medic/tip lucrare

4. Gestionare Stocuri Avansată:
•	Alertă automată când stocul scade sub un prag setat
•	Istoric al prețurilor materialelor
•	Sugestii de comandă bazate pe consumul istoric
•	Integrare cu furnizori (pentru comenzi directe - versiune viitoare)

5. Multi-locație pentru Organizații Mari:
•	Posibilitatea ca o organizație să aibă mai multe clinici
•	Transfer pacienți între locații
•	Raportare consolidată sau pe locație

6. Template-uri și Automatizări:
•	Template-uri pentru planuri de tratament
•	Template-uri pentru consimțăminte
•	Email-uri automate pentru confirmări/reminder-uri
•	Template facturi personalizabile cu logo clinică



platforma 100% functionala si sa se incadreze in freetire Proiectul se va numi pe supabase si pe github "clinica"
upload automat pe Vercel
Aplicatia trebuie sa fie optimizata si pentru telefon/tableta si in viitor va avea si aplicatie  mobila android/ios
