!SLIDE
## <strong>Why use JRuby?</strong> ##
---
### Performance ###
### Native threads ###
### Cross - platform ###

<div class="notes">
Jeśli porównamy Ruby i Javę jako języki - nie muszę nikogo chyba przekonywać,
o tym który język jest bardziej zwięzły, dynamiczny, elastyczny, po prostu ciekawszy.
Gdy jednak porównamy dwie inne kwestie, mianowicie mnogość bibliotek oraz możliwośći
platformy uruchomieniowej - korzyść przechyla się jednak na stronę Javy.
<br></br><br></br>
O ile większa liczba bibliotek nie musi wcale być dla niektórych imponująca,
o tyle wydajność maszyny wirtualnej sprawia, że JRuby w zasadzie dorównał już i
powoli zaczyna wygrywać z CRuby 1.9
<br></br><br></br>
Skoro mamy javę, możemy również korzystać z natywnym wątków.
<br></br><br></br>
Jakakolwiek java by nie była, posiada jednak tę zaletę, że jest to technologia przenośna,
co także możemy wykorzystać pisząc w jruby.
</div>

!SLIDE
## <strong>Why use JRuby?</strong> ##
---
### Ways to use legacy Java code base ###
### Wrapping a Java library ###
### Embedding JRuby in Java environment ###

<div class="notes">
Jeśli jednak jesteśmy na tyle otwarci, że możemy uznać, że coś napisanego w Javie
to nie jest czyste zło, mamy z JRubim możliwość bezpośredniego korzystania z
bibliotek javowych. Wcześniejsza integracja polegała bądź to na korzystaniu
z różnych mostów (rjb) bądź webserwisów.
<br></br><br></br>
Co wazne, w JRuby wołanie metod drugiego jezyka działa w dwie strony.
Możemy klasę napisaną w Jruby skompilować, i uzyć jej "po drugiej stronie mocy".
<br></br><br></br>
Jeśli chodzi o ekosystem bibliotek, najpopularniejsze repo javowe,
maven artifacts zawiera w tym momencie około 150 000 słoików, dżemików natomiast
mamy około 23,000
<br></br><br></br>
Przykłady kodu zobaczmy za chwile...
</div>

!SLIDE
## **Why use JRuby?** ##
---
### Take Rails into the Enterprise ;) ###

<div class="notes">
Niestety poza aspektem czysto technicznym, nie możemy zapominać o pewnego rodzaju
przeświadczeniu, że sporo firm nie uważa(ło) rubiego jako poważna technologię.
Możliwość skorzystania z Railsów uruchomionych na kontenerze javowym
otwarła nam jakby furtkę do niektórych projektów.
</div>

!SLIDE
## **Common scenarios** ##
---
### Java backend + Rails deployed on Tomcat ###
### ActiveModel wrappers around Java models (add DSL /improve API) ###
### Development tools (testing, building, project management) ###

!SLIDE
## **Possible disadvantages** ##
---
### Requires more momory ###
### Startup time ###
### C extensions - work in progress ###

!SLIDE
## **Ruby & Java integration** ##

<div class="notes">
Przejdźmy teraz do integracji obu języków
</div>

!SLIDE
## Installation ##

### RVM ###

    @@@ bash
    rvm install jruby-1.6.0
    rvm use jruby

    ruby -v
    # => jruby 1.6.0 (ruby 1.8.7 patchlevel 330)

### System ###
    @@@ bash
    sudo apt-get install jruby

### Source ###
    @@@ bash
    git clone https://github.com/jruby/jruby.git
    ant

<div class="notes">
Najlepiej zainstalowac jruby z RVMa, używam tego narzędzia już chyba ponad pół roku.
Trzeba uważać na gemsety #global, pozatym zero problemów..

Jesli chcemy mieć najnowszą wersję można zawsze sciągnać paczkę, ustawić jruby na scieżce i gotowe..

Na windowsa jest całkiem fajny isntaller

Źródła są na githubie
</div>

!SLIDE
## Options

    @@@ bash
    -J-Xmx512m    Pass option to JVM

    --profile     run with profiler

    --client      use the non-optimizing "client" JVM
                  (improves startup; default)
    --server      use the optimizing "server" JVM
                  (improves performance)

    --1.8         Ruby 1.8.x compatibility (default)
    --1.9         Ruby 1.9.x compatibility

!SLIDE
## 1.9 compatibility ##

    @@@ bash
    jruby --1.9 -e "sum = -> a, b { a + b }; p sum[2,3]"
    # => 5

    jruby -e "sum = -> a, b { a + b }; p sum[2,3]"
    # => SyntaxError: -e:1: syntax error, unexpected tGT
    sum = -> a, b { a + b }; puts sum[2,3]
            ^

!SLIDE
## **Ruby & Java integration** ##
---
### Loading classes ###
### Using objects ###
### Passing parameters ###
### Overloaded methods ###
### Java interfaces ###

!SLIDE
## Setting Classpath ##
### Env variable
### From source

!SLIDE
## Setting Classpath ##

### Env variable

    @@@ bash
    $ jruby -J-cp $CLASSPATH:/path/to/library.jar

### From source

    @@@ Ruby
    require 'java'
    $CLASSPATH << '/path/to/library.jar'

    # or..
    require '/path/to/library.jar'

    # or..
    $LOAD_PATH << '/path/to'
    require 'jemmy.jar'


!SLIDE
## Loading classes ##
### By namespaces ###
### By importing ###

!SLIDE
## Loading classes ##

### By namespaces ###
    @@@ Ruby
    # common namespaces (com, org, java, and javax)
    require 'java'
    java.lang.StringBuffer

    # default package (prepend Java::)
    Java::MyTopLevelClass

### By importing ###
    @@@ Ruby
    StringBuffer = java.lang.StringBuffer

    # shortcut:
    java_import java.lang.StringBuffer

    # alias
    java_import 'java.lang.String' do |pckg, classname|
      'JString'
    end

!SLIDE
## Using objects ##

!SLIDE
## Using objects ##
### .. Java idioms translated into “the Ruby way”.. ###
    @@@ ruby
    # java getters/setter => attrs accessors


    user.setName('Matz')
    user.name = 'Matz'

!SLIDE
## Using objects ##
### .. Java idioms translated into “the Ruby way”.. ###
    @@@ ruby
    # camelCase => snake_case

    java_import java.lang.System
    System.currentTimeMillis
    System.current_time_millis

!SLIDE
## Using objects ##
### .. Java idioms translated into “the Ruby way”.. ###
    @@@ ruby
    # object construction
    # new URL(String spec)
    # new URL(String protocol, String host, String file)
    URL.new 'http://srug.pl'
    URL.new 'http' , 'srug.pl' , '/jruby'

!SLIDE
## Passing parameters ##

!SLIDE
## Passing parameters ##
### Basic Types ###
    @@@ ruby
    String   # => java.lang.String
    Fixnum   # => int / java.lang.Float / ...
    Float    # => float / java.lang.Double
    NilClass # => null reference
    Bignum   # => java.math.BigInteger

!SLIDE
## Passing parameters ##
### Some Java code ...
    @@@ java
    public class Dude {
        public static String whatsMyType(Object o) {
            return o.getClass().getName();
        }
    }

### Check parameter type ...
    @@@ ruby
    Dude.whats_my_type(['a', 'b'])
    # => "org.jruby.RubyArray"

    Dude.whats_my_type(['a', 'b'].to_java)
    # => "[Ljava.lang.Object;"

    ['a','b'].to_java(:string).java_class.name
    # => "[Ljava.lang.String;"

!SLIDE
## Java interfaces ##

!SLIDE
## Java interfaces ##

### Java
    @@@ java
    static Callable<Object> callable(Runnable task);
### Ruby
    @@@ ruby
    require 'java'
    java_import java.lang.Runnable
    java_import java.util.concurrent.Executors

    class Foo
      include Runnable

      def run
        puts "Run!"
      end
    end

    call_me = Executors.callable(Foo.new)
    call_me.call

!SLIDE
## Java interfaces ##

### Java
    @@@ java
    static Callable<Object> callable(Runnable task);
### Ruby
    @@@ ruby
    require 'java'
    java_import java.lang.Runnable
    java_import java.util.concurrent.Executors

    # for single-methods i-faces
    call_me = Executors.callable do
      puts "Run!"
    end
    call_me.call

