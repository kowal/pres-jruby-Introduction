!SLIDE
## <strong>Runtime modes</strong> ##
---
### Interpreted ###
### Just-in-time ###
### Ahead-of-time ###

<div class="notes">
Programy pisane w JRuby można uruchamiać na kilka sposobów. Tym najcześciej spotykanym jest uruchamianie
kodu tak samo jak w wiekszości pozostałych implementacji Ruby, tzn poprzez interpreter, aczkolwiek...
<br></br><br></br>
Różnica w przypadku JRuby jest taka, że wykorzystywany jest równiez kompilator JIT,
który to kompiluje "w locie" kod najczęściej wykonywany. Możemy wykorzystac tutaj dobrodziejstwo JVM :)
<br></br><br></br>
Domyślnie jruby uruchamiany jest z kompilacja JIT. Pozostałe opcje to kompilowanie
wszystkiego "z góry" - ahead-of-time. W tym trybie JVM może dokonać mniejszej liczby
optymalizacji ponieważ nie wie jeszcze, które fragmenty kodu będą wykonywane najczęściej.
</div>

!SLIDE
## <strong>JIT</strong> ##

### Performance improves over time... ###

    @@@ ruby
    # performance.rb
    require 'benchmark'

    def expensive(i)
      # very expensive computations...
    end

    5.times do
      timing = Benchmark.measure do
        1000.times { |i| expensive(i) }
      end
      puts timing
    end

!SLIDE

    @@@ bash
    jruby -J-Djruby.compile.mode=OFF performance.rb
      0.086000   0.000000   0.086000 (  0.052000)
      0.023000   0.000000   0.023000 (  0.023000)
      0.012000   0.000000   0.012000 (  0.012000)
      0.013000   0.000000   0.013000 (  0.013000)

    jruby performance.rb
      0.065000   0.000000   0.065000 (  0.047000)
      0.021000   0.000000   0.021000 (  0.021000)
      0.014000   0.000000   0.014000 (  0.014000)
      0.009000   0.000000   0.009000 (  0.009000)

!SLIDE
## <strong>Write code to make use of JIT</strong> ##
---
### Try to not generate code at runtime ###
### Create small methods ###

!SLIDE bullets incremental smaller
# <strong>When to use AOT?</strong> #

* System requires .class files
* Hide source code
* AOT is faster than JIT (Android)

!SLIDE
## JRuby AOT compiler ##

    @@@ bash
    jrubyc program.rb         # => Program.class
    jrubyc --java program.rb  # => Program.java
    jrubyc --javac program.rb # => Program.java Program.class

!SLIDE
### Using compiled Ruby class in ... Ruby ;)
    @@@ ruby
    # user.rb :
    class User
      def self.create(args={})
        @args = args
      end
    end

    # jrubyc user.rb => user.class

    # other.rb:
    require 'java'
    require 'user' # will use user.class
    User.create :name => 'Marek'





