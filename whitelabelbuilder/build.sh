files_upload_dir="../../whitelabelbuilder/static/$1"
flavors_dir="../white-label/white-label/app/whitelabel/"
scripts_dir="../../../../../../../whitelabelbuilder"
app_suffix=$(echo a$1a| tr -d '-')

cd $flavors_dir
mkdir ./$1
cp -a ../../../defaultFlavor/. ./$1
echo a$1a| tr -d '-' > ./$1/applicationIdSuffix

cd $1/res/values
chmod +x $scripts_dir/set_xml_tag_value.sh
$scripts_dir/set_xml_tag_value.sh secrets.xml integer $2 " name=\"service_id\""
$scripts_dir/set_xml_tag_value.sh customization.xml color $3 " name=\"colorPrimary\""
$scripts_dir/set_xml_tag_value.sh customization.xml string $4 " name=\"about_us\""
$scripts_dir/set_xml_tag_value.sh customization.xml string $5 " name=\"vk\""
$scripts_dir/set_xml_tag_value.sh customization.xml string $6 " name=\"instagram\""
$scripts_dir/set_xml_tag_value.sh customization.xml string $7 " name=\"facebook\""
$scripts_dir/set_xml_tag_value.sh customization.xml string $8 " name=\"site\""
$scripts_dir/set_xml_tag_value.sh customization.xml string $9 " name=\"application_name\""

cd ../../../../../
# sleep 2
./gradlew assembleDebug -q

mkdir $files_upload_dir
cp ./app/build/outputs/apk/$1/debug/app-$1-debug.apk $files_upload_dir/whitelabel.apk
rm -rf ./app/whitelabel/$1