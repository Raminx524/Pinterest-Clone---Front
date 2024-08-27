import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, StatusBar, FlatList, Text, Image, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faCircleXmark, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { color } from 'react-native-elements/dist/helpers';
import { data } from './index';
import { Link } from 'expo-router';

export default function SearchScreen() {
  const [search, setSearch] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<Pin[]>([
    {
      id: 'id010',
      imgURL: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
      text: 'Cats',
    },
    {
      id: 'id011',
      imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
      text: 'Dogs',
    },
    {
      id: 'id012',
      imgURL: 'https://example.com/image1.jpg',
      text: 'Nature',
    },
    {
      id: 'id013',
      imgURL: 'https://example.com/image2.jpg',
      text: 'Travel',
    },
    {
      id: 'id014',
      imgURL: 'https://example.com/image3.jpg',
      text: 'Food',
    },
    {
      id: 'id015',
      imgURL: 'https://example.com/image4.jpg',
      text: 'Fashion',
    },
    {
      id: 'id016',
      imgURL: 'https://example.com/image5.jpg',
      text: 'Technology',
    },
    {
      id: 'id017',
      imgURL: 'https://example.com/image6.jpg',
      text: 'Fitness',
    },
    {
      id: 'id018',
      imgURL: 'https://example.com/image7.jpg',
      text: 'Art',
    },
    {
      id: 'id019',
      imgURL: 'https://example.com/image8.jpg',
      text: 'Photography',
    },
    {
      id: 'id020',
      imgURL: 'https://example.com/image9.jpg',
      text: 'Home Decor',
    },
    {
      id: 'id021',
      imgURL: 'https://example.com/image10.jpg',
      text: 'DIY',
    },
    {
      id: 'id022',
      imgURL: 'https://example.com/image11.jpg',
      text: 'Gardening',
    },
    {
      id: 'id023',
      imgURL: 'https://example.com/image12.jpg',
      text: 'Recipes',
    },
    {
      id: 'id024',
      imgURL: 'https://example.com/image13.jpg',
      text: 'Architecture',
    },
    {
      id: 'id025',
      imgURL: 'https://example.com/image14.jpg',
      text: 'Music',
    },
    {
      id: 'id026',
      imgURL: 'https://example.com/image15.jpg',
      text: 'Movies',
    },
    {
      id: 'id027',
      imgURL: 'https://example.com/image16.jpg',
      text: 'Sports',
    },
    {
      id: 'id028',
      imgURL: 'https://example.com/image17.jpg',
      text: 'Education',
    },
    {
      id: 'id029',
      imgURL: 'https://example.com/image18.jpg',
      text: 'Science',
    },
    {
      id: 'id030',
      imgURL: 'https://example.com/image19.jpg',
      text: 'Animals',
    },
    {
      id: 'id031',
      imgURL: 'https://example.com/image20.jpg',
      text: 'Events',
    },
    {
      id: 'id032',
      imgURL: 'https://example.com/image21.jpg',
      text: 'Weddings',
    },
    {
      id: 'id033',
      imgURL: 'https://example.com/image22.jpg',
      text: 'Lifestyle',
    },
    {
      id: 'id034',
      imgURL: 'https://example.com/image23.jpg',
      text: 'Travel Tips',
    },
    {
      id: 'id035',
      imgURL: 'https://example.com/image24.jpg',
      text: 'Kids',
    },
    {
      id: 'id036',
      imgURL: 'https://example.com/image25.jpg',
      text: 'Camping',
    },
    {
      id: 'id037',
      imgURL: 'https://example.com/image26.jpg',
      text: 'Beach',
    },
    {
      id: 'id038',
      imgURL: 'https://example.com/image27.jpg',
      text: 'Winter',
    },
    {
      id: 'id039',
      imgURL: 'https://example.com/image28.jpg',
      text: 'Spring',
    },
    {
      id: 'id040',
      imgURL: 'https://example.com/image29.jpg',
      text: 'Summer',
    },
    {
      id: 'id041',
      imgURL: 'https://example.com/image30.jpg',
      text: 'Autumn',
    },
  ]);
  const searchBarRef = useRef<TextInput>(null);
  useEffect(() => {
    focused||search.length>0 ? searchBarRef.current?.focus() : searchBarRef.current?.blur();
  }, [focused]);

  const renderItem = ({ item }: { item: { id: string, imgURL: string, text: string } }) => (
    <TouchableOpacity key={item.id} style={styles.itemContainer} onPress={() => handleSelection(item.text)}>
      <Image source={{ uri: data[Math.floor(Math.random() * data.length)].imgURL }} style={styles.image} />
      <View style={styles.overlay} />
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
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
  const handleRemove=(id:string)=>{
   setSearchHistory(searchHistory.filter(e => e.id !== id))
  }

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
              <TouchableOpacity onPress={() => setSearch('')}>
                <FontAwesomeIcon icon={faCircleXmark} style={{ ...styles.icon, opacity: 0.9 }} />
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
          {filteredData(searchHistory).slice(0, search.length==0?20:6).map(item => (
            <TouchableOpacity key={item.id} onPress={() => handleSelection(item.text)} style={styles.searchItem}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size={15} color="#000" style={styles.searchIcon} />
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.searchText} numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
                {search.length==0&&
                <TouchableOpacity onPress={() => handleRemove(item.id)}>
                  <FontAwesomeIcon icon={faXmark} size={20} color='gray' />
                </TouchableOpacity>
                }
              </View>
            </TouchableOpacity>
          ))}

          {search.length > 0 && filteredData(data).slice(0, 6).map(item => (
            <TouchableOpacity key={item.id} onPress={() => handleSelection(item.text)} style={styles.searchItem}>
              <Image source={{ uri: item.imgURL }} style={styles.searchImage} />
              <View>
                <Text style={styles.searchText} numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
                <Text style={styles.smallSearchText} numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <Text style={styles.suggestionText}>Looking for ideas you saved?</Text>
          <Link href={'/saved'} asChild>
          <Button title="Search your pins" buttonStyle={styles.myPinsButton} onPress={() => {/* handle press */}} />
          </Link>
        </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
    opacity: 0.8
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
  cancelButtonContainer: {},
  cancelButtonText: {
    color: 'black',
    fontSize: 18
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
    marginRight: 15,
  },
  searchText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: 10,
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
  scrollViewContent: {
    paddingBottom: 20,
  },
});




interface Pin {
  id: string;
  imgURL: string;
  text: string;
}

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
]
const forYou:Pin[]=[
  {
    id: 'id007',
    imgURL: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Cats',
  },
  {
    id: 'id008',
    imgURL: 'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Dogs',
  },
]