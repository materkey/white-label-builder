# !/bin/bash
# Written by rafazzevedo
# http://www.azevedorafaela.wordpress.com

# Uncomment this if you want to use parameters given by #the user and change the variables for the parameters #position like: $1 is the first parameter, $2 is the #second. Instead of tag, xml_file...
# if [ $# -ne 3 ]; then
# echo 1>&2 "Please, use the parameters file, tag and new value."
# exit 127
# fi

xml_file="$1"
tag="$2"
new_value="$3"
extra="$4"

# We will create a temporary file, just to not modify directly the original one.
temporary="temp_file.temp"

# This space is just to identify the end of the xml.
echo " ">> $xml_file

# Extracting the value from the <$tag> element
tag_value=$(grep "<$tag$extra>.*<.$tag>" $xml_file | sed -e "s/^.*<$tag/<$tag/" | cut -f2 -d">"| cut -f1 -d"<")

echo "Found tag value $tag_value..."

# Replacing element value with $new_value
sed -e "s/<$tag$extra>$tag_value<\/$tag>/<$tag$extra>$new_value<\/$tag>/g" $xml_file > $temporary

echo "Changing $tag to $new_value..."

# Updating the changes to the original file ($xml_file)
chmod 666 $xml_file
mv $temporary $xml_file
