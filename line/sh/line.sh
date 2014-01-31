cd ~/Downloads/searcher/
grep ,result,common,load, searcher01_searcher.log.20140130  |
perl -F',' -alne '@t=localtime($F[0]);printf("%d%02d%02d%02d",@t[5]+1900,@t[4]+1,@t[3],@t[2]); print "";' |
sort |
uniq -c |
perl -pe 's/^ *//g' > /Users/makoll/Dropbox/work/eclipse_workspace/t02_testphp/d3/test.csv
