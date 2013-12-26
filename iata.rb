require 'open-uri'
require 'json'
require 'pry'

file = './files/url2place/tema.ru.json'
places = JSON.parse( IO.read(file) )
new_places = {}
places.each do |id, place|
    iata = place['destination_iata']
    url = "http://hotellook.ru/api/suggest.json?lang=en&term=#{iata}"
    suggest = JSON.parse(open(url).read)
    puts suggest['suggest']['city'].first

    places[id]['search_id'] = suggest['suggest']['city'].first['id'] if suggest['suggest']['city'].first
    places[id]['search_type'] = 'city'
end

File.open(file, 'w') { |file| file.write(places.to_json)}



#places.each do |id, place|
#places[id]['destination'] = place['name']
#end
#File.open(file, 'w') { |file| file.write(places.to_json)}