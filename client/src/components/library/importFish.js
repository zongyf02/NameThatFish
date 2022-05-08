const importFish = async (fishName) => {
  if (fishName == 'Atlantic Salmon') {
    return {
      large: await import('../../../assets/images/AtlanticSalmon/large.png'),
      small: {
        small1: await import('../../../assets/images/AtlanticSalmon/small1.jpg'),
        small2: await import('../../../assets/images/AtlanticSalmon/small2.jpg'),
        small3: await import('../../../assets/images/AtlanticSalmon/small3.jpg'),
      },
    };
  } else if (fishName == 'Bluegill') {
    return {
      large: await import('../../../assets/images/Bluegill/large.png'),
      small: {
        small1: await import('../../../assets/images/Bluegill/small1.jpg'),
        small2: await import('../../../assets/images/Bluegill/small2.jpg'),
        small3: await import('../../../assets/images/Bluegill/small3.jpg'),
      },
    };
  } else if (fishName == 'Brook Trout') {
    return {
      large: await import('../../../assets/images/BrookTrout/large.png'),
      small: {
        small1: await import('../../../assets/images/BrookTrout/small1.jpg'),
        small2: await import('../../../assets/images/BrookTrout/small2.jpg'),
        small3: await import('../../../assets/images/BrookTrout/small3.jpg'),
      },
    };
  } else if (fishName == 'Channel Catfish') {
    return {
      large: await import('../../../assets/images/ChannelCatfish/large.png'),
      small: {
        small1: await import('../../../assets/images/ChannelCatfish/small1.jpg'),
        small2: await import('../../../assets/images/ChannelCatfish/small2.jpg'),
        small3: await import('../../../assets/images/ChannelCatfish/small3.jpg'),
      },
    };
  } else if (fishName == 'Chinook Salmon') {
    return {
      large: await import('../../../assets/images/ChinookSalmon/large.png'),
      small: {
        small1: await import('../../../assets/images/ChinookSalmon/small1.jpg'),
        small2: await import('../../../assets/images/ChinookSalmon/small2.jpg'),
        small3: await import('../../../assets/images/ChinookSalmon/small3.jpg'),
      },
    };
  } else if (fishName == 'Crappie') {
    return {
      large: await import('../../../assets/images/Crappie/large.png'),
      small: {
        small1: await import('../../../assets/images/Crappie/small1.jpg'),
        small2: await import('../../../assets/images/Crappie/small2.jpg'),
        small3: await import('../../../assets/images/Crappie/small3.jpg'),
      },
    };
  } else if (fishName == 'Flathead Catfish') {
    return {
      large: await import('../../../assets/images/FlatheadCatfish/large.png'),
      small: {
        small1: await import('../../../assets/images/FlatheadCatfish/small1.jpg'),
        small2: await import('../../../assets/images/FlatheadCatfish/small2.jpg'),
        small3: await import('../../../assets/images/FlatheadCatfish/small3.jpg'),
      },
    };
  } else if (fishName == 'Lake Sturgeon') {
    return {
      large: await import('../../../assets/images/LakeSturgeon/large.png'),
      small: {
        small1: await import('../../../assets/images/LakeSturgeon/small1.jpg'),
        small2: await import('../../../assets/images/LakeSturgeon/small2.jpg'),
        small3: await import('../../../assets/images/LakeSturgeon/small3.jpg'),
      },
    };
  } else if (fishName == 'Sea Lamprey') {
    return {
      large: await import('../../../assets/images/SeaLamprey/large.png'),
      small: {
        small1: await import('../../../assets/images/SeaLamprey/small1.jpg'),
        small2: await import('../../../assets/images/SeaLamprey/small2.jpg'),
        small3: await import('../../../assets/images/SeaLamprey/small3.jpg'),
      },
    };
  } else if (fishName == 'Largemouth Bass') {
    return {
      large: await import('../../../assets/images/LargemouthBass/large.png'),
      small: {
        small1: await import('../../../assets/images/LargemouthBass/small1.jpg'),
        small2: await import('../../../assets/images/LargemouthBass/small2.jpg'),
        small3: await import('../../../assets/images/LargemouthBass/small3.jpg'),
      },
    };
  } else if (fishName == 'Muskellunge') {
    return {
      large: await import('../../../assets/images/Muskellunge/large.png'),
      small: {
        small1: await import('../../../assets/images/Muskellunge/small1.jpg'),
        small2: await import('../../../assets/images/Muskellunge/small2.jpg'),
        small3: await import('../../../assets/images/Muskellunge/small3.jpg'),
      },
    };
  } else if (fishName == 'Northern Pike') {
    return {
      large: await import('../../../assets/images/NorthernPike/large.png'),
      small: {
        small1: await import('../../../assets/images/NorthernPike/small1.jpg'),
        small2: await import('../../../assets/images/NorthernPike/small2.jpg'),
        small3: await import('../../../assets/images/NorthernPike/small3.jpg'),
      },
    };
  } else if (fishName == 'Rainbow Trout') {
    return {
      large: await import('../../../assets/images/RainbowTrout/large.png'),
      small: {
        small1: await import('../../../assets/images/RainbowTrout/small1.jpg'),
        small2: await import('../../../assets/images/RainbowTrout/small2.jpg'),
        small3: await import('../../../assets/images/RainbowTrout/small3.jpg'),
      },
    };
  } else if (fishName == 'Rock Bass') {
    return {
      large: await import('../../../assets/images/RockBass/large.png'),
      small: {
        small1: await import('../../../assets/images/RockBass/small1.jpg'),
        small2: await import('../../../assets/images/RockBass/small2.jpg'),
        small3: await import('../../../assets/images/RockBass/small3.jpg'),
      },
    };
  } else if (fishName == 'Smallmouth Bass') {
    return {
      large: await import('../../../assets/images/SmallmouthBass/large.png'),
      small: {
        small1: await import('../../../assets/images/SmallmouthBass/small1.jpg'),
        small2: await import('../../../assets/images/SmallmouthBass/small2.jpg'),
        small3: await import('../../../assets/images/SmallmouthBass/small3.jpg'),
      },
    };
  } else if (fishName == 'Sunfish') {
    return {
      large: await import('../../../assets/images/Sunfish/large.png'),
      small: {
        small1: await import('../../../assets/images/Sunfish/small1.jpg'),
        small2: await import('../../../assets/images/Sunfish/small2.jpg'),
        small3: await import('../../../assets/images/Sunfish/small3.jpg'),
      },
    };
  } else if (fishName == 'Walleye') {
    return {
      large: await import('../../../assets/images/Walleye/large.png'),
      small: {
        small1: await import('../../../assets/images/Walleye/small1.jpg'),
        small2: await import('../../../assets/images/Walleye/small2.jpg'),
        small3: await import('../../../assets/images/Walleye/small3.jpg'),
      },
    };
  } else if (fishName == 'White Perch') {
    return {
      large: await import('../../../assets/images/WhitePerch/large.png'),
      small: {
        small1: await import('../../../assets/images/WhitePerch/small1.jpg'),
        small2: await import('../../../assets/images/WhitePerch/small2.jpg'),
        small3: await import('../../../assets/images/WhitePerch/small3.jpg'),
      },
    };
  } else if (fishName == 'Yellow Perch') {
    return {
      large: await import('../../../assets/images/YellowPerch/large.png'),
      small: {
        small1: await import('../../../assets/images/YellowPerch/small1.jpg'),
        small2: await import('../../../assets/images/YellowPerch/small2.jpg'),
        small3: await import('../../../assets/images/YellowPerch/small3.jpg'),
      },
    };
  }
};

export default importFish;
