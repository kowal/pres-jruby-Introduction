!SLIDE
# **JRuby** #
## Introduction ##

<div class="notes">
W mojej dzisiejszej prezentacji chciałem opowiedzieć i mam nadzieję
zachęcic Was do zapoznania się z JRubim, implementacją naszego
ulubionego języka na maszynę wirtualną Javy.
</div>

!SLIDE
## **Agenda** ##
---
### History ###
### Ruby - Java integration ###
### Runtime ###
### App Deployment ###
### Future ###

<div class="notes">
Tak przedstawia się plan prezentacji.
<br></br><br></br>
Na początku przypomnę krótko historię rozwoju jrubiego...
omówimy sobie kwestie dlaczego ktoś mógłby byc zainteresowany tą implementacją.
<br></br><br></br>
To co chyba najbardziej wszystkich interesuje, czyli jakie są możliwości integracji z Javą?
Jak się to prezentuje? i na ktore aspekty takiej integracji trzeba uważać?
<br></br><br></br>
Oczywiście wspomnimy tez o korzystaniu w drugą stronę, czyli w jaki sposób program
napisany w Javie, moze wykorzystać bibliotekę rubiową..
<br></br><br></br>
Kolejnymi punktami bedą: kompilator jruby, mozliwosci uruchamiania aplikacji webowych
oraz nowe możliwości wynikające z korzystania z maszyny wirtualnej..
<br></br><br></br>
Na koniec kilka przykładów rozwiązań już dostępnych. Przedstawię też uproszony przykład
korzystania w jrubim z biblioteki javowej
<br></br><br></br>
No koniec opowiem o kilku ciekawych projektach zwiazanych z jruby..
</div>

!SLIDE bullets incremental smaller
## **The story of JRuby** ##
---
* 2001 - created by **Jan Arne Petersen**
* 2006 - Rails support
* 2007 - JRuby 1.0
* 2009 - Engine Yard, Ruby 1.9, first **JRubyConf**
* 2011 - Ruby 1.9.2, profiler, experimental C support
* 2011 - Book: *"Using JRuby: Bringing Ruby to Java"*
* 2011 - 15 March - **JRuby 1.6**

<div class="notes">
Prace nad Jruby zostały ropoczęte w roku 2001.
Na tle innych alternatyw MRI jest to impl. najbardziej dojrzała, stabilna.
<br></br><br></br>
5 lat po później można już było pochwalić sie tym, że da się na jrubim odpalić railsy,
 w 2007 projekt dobił do wersji 1.0!
<br></br><br></br>
Bardzo ważne wydarzenie, Oficjalne wsparcie wędruje z Suna do EngineYard,
najbardziej wypasionej rubiowej firmy :) w tym roku jrubi staje się praktycznie kompatybilny
z mri 1.9 ...... organizuje sie tez 1szy jruby-conf
<br></br><br></br>
W tym roku, chociaż dopiero się zaczał, też sie juz bardzo dużo działo:
dodano kompatybilnośc z 1.9.2
dodano profiler,
dodano eksperymentalne wspacie dla C
<br></br><br></br>
Pojawiła sie też kolejna, najbardziej aktualna książka, którą mogę polecić.
Nie ukrywam, że pomogła mi sporo przy tworzeniu tej prezentacji.
</div>

!SLIDE
## **Current core-team** ##
---
### Charles Nutter, Thomas Enebo, Ola Bini, Nick Sieger ###
