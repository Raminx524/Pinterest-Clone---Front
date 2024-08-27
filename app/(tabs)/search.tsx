import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, StatusBar, FlatList, Text, Image, TouchableOpacity, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchScreen() {
  const [search, setSearch] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const searchBarRef = useRef<TextInput>(null);

  useEffect(() => {
    focused ? searchBarRef.current?.focus() : searchBarRef.current?.blur();
  }, [focused]);

  const renderItem = ({ item }: { item: { id: string, imgURL: string, text: string } }) => (
    <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => handleSelection(item.text)}>
      <Image source={{ uri: item.imgURL }} style={styles.image} />
      <Text style={styles.text}>{item.text}</Text>
    </TouchableOpacity>
  );

  const filteredData = (data: any[]) =>
    data.filter(item => item.text.toLowerCase().includes(search.toLowerCase()));

  const handleCancel = () => {
    setSearch('');
    setFocused(false);
  };

  const handleSelection = (text: string) => {
    setSearch(text);
    // make search action
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBarContainer}>
            {!focused && <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon} />}
            <TextInput
              placeholder="Search for ideas"
              onChangeText={setSearch}
              value={search}
              style={styles.input}
              ref={searchBarRef}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            {search.length === 0 ? (
              <FontAwesomeIcon icon={faCamera} style={styles.icon} />
            ) : (
              <TouchableOpacity onPress={()=>setSearch('')}>
                <FontAwesomeIcon icon={faCircleXmark} style={styles.icon}/>
              </TouchableOpacity>
            )}
          </View>

          {focused && (
            <Button
              title="Cancel"
              onPress={handleCancel}
              buttonStyle={styles.cancelButton}
              containerStyle={styles.cancelButtonContainer}
              titleStyle={styles.cancelButtonText}
            />
          )}
        </View>
        {!focused && (
          <View>
            <Text style={styles.header}>Ideas for you</Text>
            <FlatList
              data={forYou}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={renderItem}
            />
            <Text style={styles.header}>Popular on Pinterest</Text>
            <FlatList
              data={popularOnPinterest}
              keyExtractor={(item) => item.id}
              numColumns={2}
              renderItem={renderItem}
            />
          </View>
        )}
        {focused && (
          <View>
            {filteredData(forYou.concat(popularOnPinterest)).slice(0, 6).map(item => (
              <TouchableOpacity key={item.id} onPress={() => handleSelection(item.text)} style={styles.searchItem}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={24} color="#000" style={styles.searchIcon} />
                <Text style={styles.searchText} numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
              </TouchableOpacity>
            ))}
            {filteredData(data).slice(0,6).map(item => (
              <TouchableOpacity key={item.id} onPress={() => handleSelection(item.text)} style={styles.searchItem}>
                <Image source={{ uri: item.imgURL }} style={styles.searchImage} />
                <View>
                  <Text style={styles.searchText} numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
                  <Text style={styles.smallSearchText} numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <Text style={styles.suggestionText}>Looking for ideas you saved?</Text>
            <Button title="Search your pins" buttonStyle={styles.myPinsButton} onPress={() => {/* handle press */}} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  icon: {
    padding: 10,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
  cancelButtonContainer: {},
  cancelButtonText: {
    color: 'black',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    position: 'absolute',
    top: '25%',
    zIndex: 10,
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchText: {
    fontSize: 18,
    color: '#333',
  },
  smallSearchText: {
    fontSize: 14,
    color: '#555',
  },
  searchImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  suggestionText: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    paddingTop: 20,
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  myPinsButton: {
    backgroundColor: 'lightgrey',
    color: 'black',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
});



interface Pin {
  id: string;
  imgURL: string;
  text: string;
}
const data: Pin[] = [
  {
    id: "id123",
    imgURL:
      "https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg",
    text: "Pioneer LHS Chaise Lounger in Grey Colour",
  },
  {
    id: "id124",
    imgURL:
      "https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red",
    text: "Precedant Furniture",
  },
  {
    id: "id125",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg",
    text: "Leverette Upholstered Platform Bed",
  },
  {
    id: "id126",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*",
    text: "Briget Accent Table",
  },
  {
    id: "id127",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Rivet Emerly Media Console",
  },
  {
    id: "id128",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Drew Barrymore Flower Home Accent Chair",
  },
  {
    id: "id129",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Ecobirdy Charlie Chair",
  },
  {
    id: "id130",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*",
    text: "Hailey Sofa",
  },
  {
    id: "id131",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*",
    text: "Farmhouse Dining Table",
  },
  {
    id: "id132",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Evelyn Coffee Table",
  },
  {
    id: "id133",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Slope Nomad Leather Sofa",
  },
  {
    id: "id134",
    imgURL:
      "https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg",
    text: "Chair and Table",
  },
  {
    id: "id223",
    imgURL:
      "https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg",
    text: "Pioneer LHS Chaise Lounger in Grey Colour",
  },
  {
    id: "id224",
    imgURL:
      "https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red",
    text: "Precedant Furniture",
  },
  {
    id: "id225",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg",
    text: "Leverette Upholstered Platform Bed",
  },
  {
    id: "id226",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*",
    text: "Briget Accent Table",
  },
  {
    id: "id227",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Rivet Emerly Media Console",
  },
  {
    id: "id228",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Drew Barrymore Flower Home Accent Chair",
  },
  {
    id: "id229",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Ecobirdy Charlie Chair",
  },
  {
    id: "id230",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*",
    text: "Hailey Sofa",
  },
  {
    id: "id231",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*",
    text: "Farmhouse Dining Table",
  },
  {
    id: "id232",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Evelyn Coffee Table",
  },
  {
    id: "id233",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Slope Nomad Leather Sofa",
  },
  {
    id: "id234",
    imgURL:
      "https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg",
    text: "Chair and Table",
  },
];
const popularOnPinterest: Pin[] = [
  {
    id: 'id001',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Healthy Dinner Recipes',
  },
  {
    id: 'id002',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Blue Wallpaper Ideas',
  },
  {
    id: 'id003',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Room Ideas',
  },
  {
    id: 'id004',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Selfie Poses',
  },
  {
    id: 'id005',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Pink Backgrounds',
  },
  {
    id: 'id006',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Art',
  },
];
const forYou: Pin[] = [
  {
    id: 'id007',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Cats',
  },
  {
    id: 'id008',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Dogs',
  },
];