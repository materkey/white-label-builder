files_upload_dir="../../whitelabelbuilder/static/$1"
flavors_dir="../white-label/white-label/app/whitelabel/"
scripts_dir="../../../../../../../whitelabelbuilder"
app_suffix=$(echo a$1a| tr -d '-')

cd $flavors_dir
mkdir ./$1
cp -a ./defaultFlavor/. ./$1
echo a$1a| tr -d '-' > ./$1/applicationIdSuffix

cd $1/res/values
chmod +x $scripts_dir/set_xml_tag_value.sh
$scripts_dir/set_xml_tag_value.sh secrets.xml integer $2 " name=\"service_id\""
$scripts_dir/set_xml_tag_value.sh colors.xml color $3 " name=\"colorPrimary\""

cd ../../../../../
# sleep 2
./gradlew assemble$1 -q

mkdir $files_upload_dir
cp ./app/build/outputs/apk/$1/debug/app-$1-debug.apk $files_upload_dir/whitelabel.apk
