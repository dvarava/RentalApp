import React from "react";
import { Dimensions } from "react-native";
import { YStack, XStack, Text, Button, Image, Theme, ScrollView, Accordion, Card, Stack } from "tamagui";
import { useRouter, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");
const cardWidth = width - 24; // Assuming 12px padding on each side
const imageWidth = cardWidth * 0.4; // Reduced image size
const contentWidth = cardWidth * 0.6;

const rentalAppTheme = {
  primaryDark: "#016180",
  primaryLight: "#1abc9c",
  backgroundLight: "#fff",
  accentDarkRed: "#8B0000",
  textDark: "#000",
  textGray: "#666666",
};

export default function PropertyDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    name,
    address,
    price,
    image,
    availability,
    description,
    propertyType,
    rooms,
    bathrooms,
    distanceFromUniversity,
  } = params;

  return (
    <Theme name="light">
      <ScrollView backgroundColor="white" padding="$3">
        <XStack space="$3">
          {/* Left side - Property Image */}
          <YStack width={imageWidth} space="$3">
            <Card width={imageWidth} height={imageWidth} overflow="hidden">
              <Card.Background>
                <Image
                  source={{ uri: Array.isArray(image) ? image[0] : image }}
                  width={imageWidth}
                  height={imageWidth}
                  resizeMode="cover"
                />
              </Card.Background>
            </Card>
          </YStack>

          {/* Right side - Property Details */}
          <YStack width={contentWidth} space="$2" justifyContent="space-between">
            <YStack space="$2">
              <Text fontSize={20} fontWeight="bold" numberOfLines={1}>{name}</Text>
              <Text fontSize={14} color="$gray11" numberOfLines={1}>{address}</Text>

              <Accordion type="multiple" defaultValue={["price"]}>
                {[
                  { title: "Price", value: "price", content: `€${price}/month` },
                  { title: "Details", value: "details", content: 
                    `${propertyType}\n${rooms} rooms, ${bathrooms} baths\n${distanceFromUniversity} km from University\n${availability}` 
                  },
                  { title: "Description", value: "description", content: description }
                ].map((item) => (
                  <Accordion.Item value={item.value} key={item.value}>
                    <Accordion.Trigger flexDirection="column" alignItems="flex-start">
                      {({ open }) => (
                        <>
                          <Text fontSize={16} fontWeight="bold">{item.title}</Text>
                          <Stack
                            height={1}
                            backgroundColor="$gray5"
                            width="100%"
                            marginTop="$1"
                            animation="quick"
                            opacity={open ? 0 : 1}
                          />
                        </>
                      )}
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <Text 
                        fontSize={14} 
                        marginTop="$1" 
                        color={item.value === "details" ? rentalAppTheme.textGray : "$color"}
                      >
                        {item.content}
                      </Text>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion>
            </YStack>

            {/* Action Buttons */}
            <XStack space="$2" marginTop="$2">
              <Button
                flex={1}
                backgroundColor={rentalAppTheme.primaryDark}
                pressStyle={{ backgroundColor: rentalAppTheme.primaryLight }}
                onPress={() => alert("Schedule a Viewing")}
              >
                <Text fontSize={14} fontWeight="bold" color="white">
                  Schedule Viewing
                </Text>
              </Button>
              <Button
                flex={1}
                backgroundColor={rentalAppTheme.accentDarkRed}
                pressStyle={{ backgroundColor: rentalAppTheme.primaryLight }}
                onPress={() => alert("Contact Landlord")}
              >
                <Text fontSize={14} fontWeight="bold" color="white">
                  Contact Landlord
                </Text>
              </Button>
            </XStack>
          </YStack>
        </XStack>

        {/* Reviews and Comments Card */}
        <Card padding="$2" marginTop="$3">
          <Text fontSize={16} fontWeight="bold" marginBottom="$1">Reviews and Comments</Text>
          <Text fontSize={14} color="$gray11">
            Reviews and comments will be displayed here.
          </Text>
        </Card>
      </ScrollView>
    </Theme>
  );
}