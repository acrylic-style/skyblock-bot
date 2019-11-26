/**
 * @typedef APIResponse
 * @property {boolean} success If api request succeeded or not
 * @property {string?} cause If error has occurred it contains cause
 *
 * -----
 * 
 * @typedef SkyBlockAuctionsAPIResponse
 * @property {boolean} success If api request succeeded or not
 * @property {string?} cause If error has occurred it contains cause
 * @property {number} page Current page. Default: 0
 * @property {number} totalPages Total pages available
 * @property {number} totalAuctions Count of all auctions, including expired auctions.
 * @property {number} lastUpdated Last updated time
 * @property {Array<Auction>} auctions List of active auctions. 1000 entries max if only fetched single page.
 *
 * -----
 *
 * @typedef Auction
 * @property {string} uuid UUID
 * @property {string} auctioneer UUID
 * @property {string} profile_id UUID
 * @property {Array<string>} coop Array of UUIDs
 * @property {number} start
 * @property {number} end
 * @property {string} item_name Item name with reforges.
 * @property {string} item_lore Item lore(description), it includes enchantments and hot potato books.
 * @property {string} extra ??? (use it with attention, since there is "Bow Bow" and something)
 * @property {Category} category Item category
 * @property {Tier} tier Item rarity
 * @property {number} starting_bid Starting bid, 10 is supposed minimum but 1 is possible. (when selling dirts, etc)
 * @property {string} item_bytes Base64 encoded string. You can convert to NBT safety when decoding.
 * @property {boolean} claimed Default: false
 * @property {Array<string>} claimed_bidders Array of UUIDs. Default: Empty array
 * @property {number} highest_bid_amount Highest bid. Default: 0
 * @property {Array<Bid>} bids All bids made to this auction. Default: Empty array
 *
 * -----
 *
 * @typedef { "armor" | "blocks" | "misc" | "weapon" | "consumables" | "accessories" } Category
 *
 * -----
 *
 * @typedef { "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY" | "SPECIAL" } Tier
 *
 * -----
 * 
 * @typedef Bid
 * @property {string} auction_id
 * @property {string} bidder UUID
 * @property {string} profile_id UUID
 * @property {number} amount how much they wasted into auction, overall.
 * @property {number} timestamp
 * 
 * -----
 * 
 * @typedef PlayerAPIResponse
 * @property {boolean} success
 * @property {string?} cause
 * @property {Player} player Everything about player
 *
 * -----
 *
 * @typedef Player
 * @property {string} _id
 * @property {string} uuid
 * @property {number} firstLogin
 * @property {string} playername Current player name
 * @property {number} lastLogin
 * @property {string} displayname
 * @property {Array<string>} knownAliases Name changes history recorded at hypixel
 * @property {Array<string>} knownAliasesLower knownAliases in lower case
 * @property {Array<string>} achievementsOneTime
 * @property {PlayerSettings} settings
 * @property {Achievements} achievements
 * @property {Stats} stats
 * @property {number} networkExp
 * @property {Map<string, number>} petConsumables
 * @property {{
 * allowedBlocks: Array<string>,
 * tutorialStep: string,
 * packages: Array<string>,
 * // ...
 * }} housingMeta
 * @property {number} karma
 * @property {number} lastAdsenseGenerateTime
 * @property {{ dailyTwoKExp: number }} eugene
 * @property {number} quickjoin_timestamp
 * @property {number} quickjoin_uses
 * @property {{ packages: Array<string> }} vanityMeta
 * @property {number} lastLogout
 * @property {string} network_update_book
 * @property {any} parkourCompletions
 * @property {number} adsense_tokens
 * @property {Array<string>} achievementTracking
 * @property {string} mcVersionRp
 * @property {boolean} autoDetectLanguage
 * @property {string} userLanguage
 * @property {{
 * links: {
 * [name:string]: string,
 * },
 * prompt: boolean,
 * TWITCH: string,
 * YOUTUBE: string,
 * DISCORD: string,
 * }} socialMedia
 * @property {{[name:string]: number}} achievementRewardsNew
 * @property {{[name:string]: object}} challenges
 * @property {{
 * total: number,
 * total_mcsorg: number,
 * secondary_mcsorg: number,
 * last_mcsorg: number,
 * last_vote: number,
 * votesToday: number,
 * secondary_mcsl: number,
 * total_mcsl: number,
 * last_mcsl: number,
 * }} voting
 * @property {number} lastClaimedReward
 * @property {number} totalRewards
 * @property {number} totalDailyRewards
 * @property {number} rewardStreak
 * @property {number} rewardScore
 * @property {number} rewardHighScore
 * @property {number} achievementPoints
 * @property {string} newPackageRank
 * @property {number?} levelUp_MVP
 * @property {{
 * giftsGiven: number,
 * bundlesGiven: number,
 * realBundlesGiven: number,
 * milestones: Array<string>
 * realBundlesReceived: number,
 * bundlesReceived: number,
 * }} giftingMeta
 * @property {Array<string>} aprilFoolsStaffClicked_0
 * @property {string} vanityFavorites
 * @property {Map<string, number>} achievementSync
 * @property {number} petJourneyTimestamp
 * @property {number} levelUp_MVP_PLUS
 * @property {string} currentClickEffect
 * @property {{ autoActivate: boolean }} questSettings
 * @property {string} packageRank
 * @property {string} monthlyPackageRank
 * @property {string} mostRecentMonthlyPackageRank
 * @property {string} particlePack
 * @property {string} rankPlusColor
 * @property {string} monthlyRankColor
 * @property {string} currentCloak
 * @property {boolean} battlePassGlowStatus
 * @property {string} prefix
 * @property {string} rank
 * @property {string} currentGadget
 * @property {{[name:string]: {REGULAR: boolean, VIP: boolean, VIP_PLUS: boolean, MVP: boolean, MVP_PLUS: boolean}>}} monthlycrates
 * @property {{[name:string]:boolean}} halloween2019Cooldowns
 * @property {{
 * canCustomize: boolean,
 * allowed_max_height: number,
 * unlockedParts: Array<string>,
 * selectedParts: object,
 * unlockedColors: Array<string>,
 * selectedColors: object,
 * }} achievementTotem
 * @property {string} currentPet
 * @property {string} mostRecentGameType
 * 
 * -----
 *
 * @typedef DecodedCompoundNBT
 * @property {string} type
 * @property {string} name
 * @property {any} value
 *
 * -----
 *
 * @typedef SkyBlockProfileAPIResponse
 * @property {boolean} succcess
 * @property {SkyBlockProfile} profile
 *
 * -----
 *
 * @typedef SkyBlockProfile
 * @property {string} profile_id
 * @property {{[uuid: string]: SkyBlockPlayer}} members
 *
 * -----
 *
 * @typedef SkyBlockPlayer
 * @property {number} last_save
 * @property {SkyBlockPlayerInventory} inv_armor
 * @property {number} first_join
 * @property {number} first_join_hub first_join + first_join_hub = timestamp?
 * @property {SkyBlockStats} stats
 * @property {{[id: string]: SkyBlockObjective}} objectives
 * @property {Array<string>} tutorial
 * @property {{[id: string]: SkyBlockQuest}} quests
 * @property {number} coin_purse
 * @property {number} last_death
 * @property {Array<string>} crafted_generators
 * @property {Array<string>} visited_zones
 * @property {Array<string>} achievement_spawned_island_types
 * @property {{[type: string]: SkyBlockSlayerBoss}} slayer_bosses currently available: zombie, spider, and wolf
 * @property {number} experience_skill_runecrafting
 * @property {number} experience_skill_combat
 * @property {number} experience_skill_mining
 * @property {Array<string>} unlocked_coll_tiers
 * @property {SkyBlockPlayerInventory} fishing_bag
 * @property {number} experience_skill_alchemy
 * @property {number} experience_skill_farming
 * @property {{[type: string]: number}} collection REMEMBER: KEYS ARE ALL UPPER CASE
 * @property {SkyBlockPlayerInventory} quiver
 * @property {SkyBlockPlayerInventory} ender_chest_contents
 * @property {SkyBlockPlayerInventory} potion_bag
 * @property {number} experience_skill_enchanting
 * @property {number} experience_skill_fishing
 * @property {SkyBlockPlayerInventory} inv_contents
 * @property {SkyBlockPlayerInventory} tailsman_bag
 * @property {number} experience_skill_foraging
 * @property {number} experience_skill_carpentry
 *
 * -----
 *
 * @typedef SkyBlockSlayerBoss
 * @property {{[level: string]: boolean}} claimed_levels
 * @property {number} boss_kills_tier_0
 * @property {number} boss_kills_tier_1
 * @property {number} boss_kills_tier_2
 * @property {number} boss_kills_tier_3
 * @property {number} boss_kills_tier_4
 * @property {number} xp
 *
 * -----
 *
 * @typedef SkyBlockQuest
 * @property {'COMPLETE' | 'ACTIVE'} status
 * @property {number} activated_at
 * @property {number} activated_at_sb
 * @property {number} completed_at
 * @property {number} completed_at_sb
 *
 * -----
 *
 * @typedef SkyBlockObjective
 * @property {'COMPLETE' | 'ACTIVE'} status
 * @property {0 | 1} progress
 * @property {number} completed_at
 *
 * -----
 *
 * @typedef SkyBlockStats
 * @property {number} kills
 * @property {number} kills_chicken
 * @property {number} kills_pig
 * @property {number} kills_cow
 * @property {number} highest_crit_damage its broken? the value is insanely high
 * @property {number} kills_skeleton
 * @property {number} kills_zombie
 * @property {number} kills_invisible_creeper
 * @property {number} kills_emerald_slime
 * @property {number} deaths
 * @property {number} deaths_diamond_skeleton
 * @property {number} deaths_diamond_zombie
 * @property {number} kills_diamond_skeleton
 * @property {number} deaths_void
 * @property {number} kills_diamond_zombie
 * @property {number} deaths_fall
 * @property {number} kills_lapis_zombie
 * @property {number} deaths_redstone_pigman
 * @property {number} kills_enderman
 * @property {number} deaths_lapis_zombie
 * @property {number} kills_sheep
 * @property {number} kills_rabbit
 * @property {number} kills_zombie_villager
 * @property {number} deaths_fire
 * @property {number} kills_spider
 * @property {number} deaths_emerald_slime
 * @property {number} items_fished
 * @property {number} items_fished_normal
 * @property {number} kills_pond_squid
 * @property {number} auctions_created
 * @property {number} auctions_fees
 * @property {number} deaths_slime
 * @property {number} kills_dasher_spider
 * @property {number} kills_splitter_spider
 * @property {number} deaths_wither_skeleton
 * @property {number} deaths_blaze
 * @property {number} kills_fireball_magma_cube
 * @property {number} deaths_fireball_magma_cube
 * @property {number} kills_wither_skeleton
 * @property {number} kills_magma_cube
 * @property {number} deaths_magma_cube_boss
 * @property {number} kills_blaze
 * @property {number} kills_witch
 * @property {number} deaths_spider
 * @property {number} kills_random_slime
 * @property {number} kills_ghast
 * @property {number} kills_generator_slime
 * @property {number} kills_weaver_spider
 * @property {number} kills_splitter_spider_silverfish
 * @property {number} kills_pigman
 * @property {number} kills_generator_magma_cube
 * @property {number} deaths_generator_magma_cube
 * @property {number} auction_bids
 * @property {number} auctions_highest_bid
 * @property {number} auctions_completed
 * @property {number} auctions_sold_common
 * @property {number} auctions_gold_earned
 * @property {number} auctions_won
 * @property {number} auctions_bought_rare
 * @property {number} auctions_gold_spent
 * @property {number} auctions_sold_rare
 * @property {number} auctions_no_bids
 * @property {number} kills_spider_jockey
 * @property {number} kills_jockey_shot_silverfish
 * @property {number} kills_jockey_skeleton
 * @property {number} auctions_bought_uncommon
 * @property {number} auctions_sold_uncommon
 * @property {number} auctions_bought_common
 * @property {number} items_fished_treasure
 * @property {number} kills_player
 * @property {number} deaths_soffocation
 * @property {number} deaths_player
 * @property {number} kills_redstone_pigman
 * @property {number} items_fished_large_treasure
 * @property {number} kills_sea_walker
 * @property {number} kills_sea_archer
 * @property {number} kills_sea_leech
 * @property {number} kills_sea_guardian
 * @property {number} kills_zombie_deep
 * @property {number} kills_chicken_deep
 * @property {number} deaths_guardian_defender
 * @property {number} kills_guardian_defender
 * @property {number} kills_catfish
 * @property {number} deaths_drowning
 * @property {number} kills_ruinwolf
 * @property {number} kills_deep_sea_protector
 * @property {number} deaths_sea_archer
 * @property {number} deaths_zombie_deep
 * @property {number} deaths_skeleton
 * @property {number} deaths_magma_cube
 * @property {number} auctions_sold_epic
 * @property {number} kills_generator_ghast
 * @property {number} kills_respawning_skeleton
 * @property {number} deaths_enderman
 * @property {number} end_race_best_time in milliseconds
 * @property {number} deaths_zealot_enderman
 * @property {number} kills_zealot_enderman
 * @property {number} kills_endermite
 * @property {number} deaths_obsidian_wither
 * @property {number} deaths_endermite
 * @property {number} kills_watcher
 * @property {number} auctions_bought_epic
 * @property {number} kills_obsidian_wither
 * @property {number} deaths_unknown
 * @property {number} kills_night_respawning_skeleton
 * @property {number} deaths_cactus
 * @property {number} deaths_watcher
 * @property {number} kills_unburried_zombie
 * @property {number} deaths_unburried_zombie
 * @property {number} kills_old_wolf
 * @property {number} deaths_old_wolf
 * @property {number} deaths_old_dragon
 * @property {number} auctions_bought_legendary
 * @property {number} deaths_wise_dragon
 * @property {number} ender_crystals_destroyed
 * @property {number} deaths_strong_dragon
 * @property {number} kills_voracious_spider
 * @property {number} deaths_zombie
 * @property {number} deaths_wolf
 * @property {number} kills_magma_cube_boss
 * @property {number} kills_howling_spirit
 * @property {number} kills_soul_of_the_alpha
 * @property {number} deaths_pack_spirit
 * @property {number} kills_pack_spirit
 * @property {number} deaths_protector_dragon
 * @property {number} kills_brood_mother_spider
 * @property {number} kills_brood_mother_cave_spider
 * @property {number} kills_protector_dragon
 * @property {number} kills_strong_dragon
 * @property {number} deaths_unstable_dragon
 * @property {number} kills_wise_dragon
 * @property {number} kills_unstable_dragon
 * @property {number} kills_young_dragon
 * @property {number} deaths_young_dragon
 *
 * -----
 *
 * @typedef SkyBlockPlayerInventory
 * @property {number} type
 * @property {string} data decode base64 -> decompress gzip -> nbt data
 *
 * -----
 *
 * @typedef {{
 * 'SkyWars': {
 *     'packages': [
 * "legacyachievement3",
 * "legacyachievement4",
 * "fix_achievements2",
 * "legacyachievement",
 * "convertedstatstoexp",
 * "update_solo_team_perk_levels",
 * "update_solo_team_kits2",
 * "update_solo_team_kits_and_perks",
 * "sprays_thanks",
 * "sprays_lucky_start",
 * "deathcry_deleted",
 * "kit_attacking_team_grenade",
 * "kit_supporting_team_armorsmith",
 * "kit_basic_solo_energix",
 * "kit_basic_solo_disco",
 * "kit_basic_solo_armorsmith",
 * "kit_attacking_team_energix",
 * "kit_basic_solo_grenade",
 * "kit_basic_solo_rookie",
 * "kit_basic_solo_healer",
 * "kit_basic_solo_frog",
 * "kit_supporting_team_ecologist",
 * "deathcry_dinosaur",
 * "cage_void-cage",
 * "victorydance_yeehaw",
 * "deathcry_enderman",
 * "balloon_green_fractal",
 * "killmessages_pirate",
 * "cage_bubblegum-cage",
 * "sprays_decorative_island",
 * "deathcry_pig",
 * "sprays_creeper",
 * "kit_defending_team_frog",
 * "kit_supporting_team_healer",
 * "sprays_gg_wp",
 * "cage_toffee-cage",
 * "balloon_tire",
 * "kit_enderchest_team_enderchest",
 * "projectiletrail_ender",
 * "sprays_snowballed",
 * "balloon_fusion",
 * "killmessages_galactic",
 * "killmessages_banana",
 * "projectiletrail_black_smoke",
 * "cage_orange-cage",
 * "cage_blue-cage",
 * "kit_advanced_solo_magician",
 * "kit_attacking_team_fisherman",
 * "killeffect_flower_explosion",
 * "killmessages_evil",
 * "projectiletrail_golden",
 * "cage_spring",
 * "projectiletrail_wave",
 * "projectiletrail_nature",
 * "victorydance_blizzard",
 * "cage_fishtank",
 * "cage_cloud-cage",
 * "killmessages_bbq",
 * "cage_dark-cage",
 * "cage_winter-cage",
 * "cage_blazing-cage",
 * "cage_banana-cage",
 * "deathcry_robot_mouse",
 * "killeffect_firework",
 * "killeffect_campfire",
 * "cage_faded-cage",
 * "killmessages_love",
 * "victorydance_night_shift",
 * "sprays_bye_bye",
 * "deathcry_fragile",
 * "balloon_funkube",
 * "lime-cage",
 * "cry_disintegrated",
 * "ffect_tnt",
 * "ctiletrail_white_smoke",
 * "rydance_meteor_shower",
 * "cry_slimy",
 * "on_red_skull",
 * "ctiletrail_snowball",
 * "s_snowball_fight",
 * "on_globe",
 * "ffect_rekt",
 * "cry_splash",
 * "cry_wither",
 * "rydance_slimester",
 * "green-cage",
 * "s_essentials",
 * "s_christmas_tree",
 * "ffect_lighting_strike",
 * "s_footfall",
 * "s_soul_harvest",
 * "rage-cage",
 * "on_relic",
 * "nether-cage",
 * "cry_dry_bones",
 * "s_i_love_you",
 * "s_mob_party",
 * "cry_sploosh",
 * "s_reveillon",
 * "royal-cage",
 * "itemap_embercell",
 * "efending_team_armorer",
 * "upporting_team_rookie",
 * "ttacking_team_scout",
 * "asic_solo_batguy",
 * "dvanced_solo_enchanter",
 * "dvanced_solo_sloth",
 * "ttacking_team_engineer",
 * "dvanced_solo_hunter",
 * "asic_solo_ecologist",
 * "juggernaut1",
 * "asic_solo_pharaoh",
 * "dvanced_solo_pyro",
 * "dvanced_solo_engineer",
 * "upporting_team_enchanter",
 * "asic_solo_scout",
 * "juggernaut2",
 * "juggernaut3",
 * "ender_mastery1",
 * "juggernaut4",
 * "bulldozer1",
 * "resistance_boost1",
 * "nourishment0",
 * "speed_boost0",
 * "speed_boost1",
 * "speed_boost2",
 * "speed_boost3",
 * "speed_boost4",
 * "knowledge1",
 * "itemap_dwarven",
 * "on_rainbowest",
 * "upporting_team_pyro",
 * "tree-cage",
 * "ffect_snow_globe",
 * "rydance_anvil_rain",
 * "essages_computer",
 * "ffect_smiley",
 * "on_beach_ball",
 * "upporting_team_pharaoh",
 * "ttacking_team_knight",
 * "ttacking_team_hunter",
 * "efending_team_guardian",
 * "efending_team_baseball-player",
 * "ining_team_cannoneer"
 *     ],
 * killstreak: number,
 * win_streak: number,
 * survived_players_solo: number,
 * blocks_placed: number,
 * time_played_kit_basic_solo_default: number,
 * blocks_broken: number,
 * losses: number,
 * coins: number,
 * chests_opened_solo: number,
 * losses_solo_insane: number,
 * time_played_solo: number,
 * quits: number,
 * losses_solo: number,
 * survived_players: number,
 * chests_opened_kit_basic_solo_default: number,
 * chests_opened: number,
 * survived_players_kit_basic_solo_default: number,
 * time_played: number,
 * deaths_kit_basic_solo_default: number,
 * losses_kit_basic_solo_default: number,
 * deaths_solo_insane: number,
 * deaths: number,
 * deaths_solo: number,
 * games_solo: number,
 * games: number,
 * games_kit_basic_solo_default: number,
 * highestKillstreak: number,
 * kills_weekly_a: number,
 * melee_kills_team: number,
 * kills: number,
 * egg_thrown: number,
 * survived_players_kit_mining_team_default: number,
 * deaths_team_insane: number,
 * survived_players_team: number,
 * time_played_kit_mining_team_default: number,
 * melee_kills: number,
 * kills_kit_mining_team_default: number,
 * most_kills_game_team: number,
 * losses_kit_mining_team_default: number,
 * games_team: number,
 * chests_opened_team: number,
 * time_played_team: number,
 * losses_team: number,
 * souls_gathered: number,
 * most_kills_game_kit_mining_team_default: number,
 * most_kills_game: number,
 * deaths_kit_mining_team_default: number,
 * // i cant keep up this (425 entries left)
 *   }
 * Arcade: {
 * coins: number,
 * // same
 * }
 * GingerBread: {
 * coins: number,
 * packages: Array<string>,
 * frame_active: string,
 * helmet_active: string,
 * booster_active: string,
 * jacket_active: string,
 * shoes_active: string,
 * engine_active: string,
 * skin_active: string,
 * pants_active: string,
 * },
 * UHC: {
 * clearup_achievement: boolean,
 * coins: number,
 * saved_stats: boolean,
 * equippedKit: string,
 * deaths: number,
 * heads_eaten: number,
 * },
 * Paintball: {
 * coins: number,
 * packages: Array<string>,
 * kills: number,
 * deaths: number,
 * shots_fired: number,
 * wins: number,
 * },
 * HungerGames: {
 * coins: number,
 * packages: Array<string>
 * deaths: number,
 * lastTourneyAd: number,
 * wins: number,
 * // if you're reading this, why you don't wanna help me? (64 lines left)
 * },
 * Walls3: {
 * coins: number,
 * packages: Array<string>,
 * chosen_class: string,
 * // help me (~224 lines left)
 * },
 * TrueCombat: {
 * coins: number,
 * packages: Array<string>,
 * },
 * BedWars: {
 * bedwars_christmas_boxes: number,
 * packages: [
 * "tiered_achievement_flag_4",
 * "in_zombie",
 * "rydance_yeehaw",
 * "s_enderman",
 * "in_villager_zombie",
 * "in_snowman",
 * "ctiletrail_slime",
 * "rydance_cold_snap",
 * "ctiletrail_white_smoke",
 * "_gg",
 * "in_bed_salesman",
 * "ctiletrail_purple_dust",
 * "cry_grumpy_villager",
 * "rydance_anvil_rain",
 * "_gift",
 * "ctiletrail_magic",
 * "ffect_head_rocket",
 * "_snowman",
 * "dtopper_angel",
 * "s_santa",
 * "dtopper_tnt",
 * "dtopper_note",
 * "ook",
 * "re_book_0",
 * "stroy_squid_missile",
 * "ffect_firework",
 * "dtopper_sword",
 * "essages_pirate",
 * "_spectrum",
 * "essages_western",
 * "_thumbs_up",
 * "cry_splash",
 * "dtopper_bomb",
 * "ffect_piñata",
 * "_storm",
 * "s_invisibility_potion",
 * "stroy_lava_explosion",
 * "cry_dinosaur",
 * "stroy_firework",
 * "_sword",
 * "ffect_burning_shoes",
 * "s_creeper",
 * "s_great_egg_hunt",
 * "ffect_egg_theft",
 * "in_holiday_bartender",
 * "s_choc_feast",
 * "ctiletrail_ender",
 * "cry_sniff",
 * "in_zombie_pigman",
 * "_bloom",
 * "cry_ding",
 * "_bunny",
 * "dtopper_sun_glasses",
 * "dtopper_sheep",
 * "cry_deflated_toy",
 * "dtopper_fish_bowl",
 * "_bed",
 * "_hi",
 * "ctiletrail_potion",
 * "_smiley_face",
 * "dtopper_flame",
 * "in_witch",
 * "in_magic_vendor",
 * "_chicken",
 * "in_creeper",
 * "in_wither_skeleton",
 * "s_bye_bye",
 * "stroy_thief",
 * "_bronze_shield",
 * "itemap_playground",
 * "_daisy",
 * "cry_enderman",
 * "dtopper_heart",
 * "cry_pig",
 * "cry_plop",
 * "_creeper_scream",
 * "_burn",
 * "ffect_campfire",
 * "s_thanks",
 * "stroy_lighting_strike",
 * "ctiletrail_water",
 * "cry_energy",
 * "essages_bbq",
 * "ffect_tnt",
 * "ffect_heart_aura",
 * "_gold",
 * "dtopper_top_hat",
 * "cry_fireball",
 * "rydance_rainbow_dolly",
 * "dtopper_monocle",
 * "_angry_face",
 * "_rip",
 * "ffect_xp_orb",
 * "ffect_squid_missile",
 * "ffect_lighting_strike",
 * "ffect_smiley",
 * "ffect_rekt",
 * "ffect_blood_explosion",
 * "ffect_cookie_fountain",
 * "ctiletrail_cold",
 * "dtopper_gapple",
 * "cry_burp",
 * "dtopper_skullsword",
 * "cry_rage",
 * "rydance_portal",
 * "dtopper_chalice",
 * "stroy_fishy",
 * "essages_noble",
 * "rydance_fanbase",
 * "s_diamond",
 * "cry_dry_bones",
 * "_emerald",
 * "dtopper_fancy_helmet",
 * "in_skeleton",
 * "ctiletrail_red_dust",
 * "dtopper_smiley_face",
 * "dtopper_slime",
 * "in_bed_researcher",
 * "_silver_shield",
 * "_no",
 * "_star",
 * "rydance_meteor_shower",
 * "_diamond",
 * "in_king_of_beds",
 * "cry_bat",
 * "s_sorry",
 * "s_bed_shield",
 * "cry_monster_burp",
 * "dtopper_whale",
 * "_thumbs_down",
 * "s_hypixel_logo_default",
 * "ctiletrail_notes",
 * "_yes",
 * "ctiletrail_lava",
 * "itemap_unturned",
 * "itemap_treenan",
 * "itemap_archway",
 * "itemap_carapace",
 * "itemap_boletum",
 * "itemap_aquarium",
 * "itemap_ashore",
 * "itemap_lectus",
 * "itemap_stonekeep",
 * "itemap_sandcastle",
 * "itemap_obelisk",
 * "itemap_eastwood",
 * "itemap_temple",
 * "itemap_airshow",
 * "dtopper_tree",
 * "s_tnt_drop",
 * "ctiletrail_hearts",
 * "essages_fire",
 * "s_gg_wp",
 * "_skull",
 * "s_golem_riding",
 * "s_bed_breaker",
 * "in_enderman",
 * "rydance_twerk_apocalypse",
 * "stroy_ghosts",
 * "dtopper_wicked_zombie",
 * "s_leaping_potion",
 * "ffect_batcrux",
 * "dtopper_pot",
 * "ffect_tornado",
 * "s_disco_pumpkin",
 * "_pumpkin_2",
 * "_lol",
 * "dtopper_candy_basket",
 * "ctiletrail_hoops",
 * "_spider",
 * "cry_robot_mouse",
 * "_gold_shield",
 * "_witch_hat"
 * ],
 * first_join_7: boolean,
 * Experience: number,
 * free_event_key_bedwars_christmas_boxes_2017: boolean,
 * Bedwars_openedChests: number,
 * Bedwars_openedCommons: number,
 * chest_history_new: Array<string>,
 * Bedwars_openedRares: number,
 * activeNPCSkin: string,
 * activeVictoryDance: string,
 * activeSprays: string,
 * activeProjectileTrail: string,
 * coins: number,
 * Bedwars_openedEpics: number,
 * games_played_bedwars_1: number,
 * winstreak: number,
 * eight_one_beds_lost_bedwars: number,
 * final_deaths_bedwars: number,
 * gold_resources_collected_bedwars: number,
 * eight_one_items_purchased_bedwars: number,
 * beds_lost_bedwars: number,
 * eight_one_final_deaths_bedwars: number,
 * eight_one_games_played_bedwars: number,
 * eight_one_wrapped_present_resources_collected_bedwars: number,
 * eight_one_entity_attack_final_deaths_bedwars: number,
 * resources_collected_bedwars: number,
 * eight_one_losses_bedwars: number,
 * losses_bedwars: number,
 * items_purchased_bedwars: number,
 * games_played_bedwars: number,
 * // hello? (338 lines left)
 * },
 * MurderMystery: {
 * mm_christmas_chests: number,
 * murdermystery_books: ['innocent', 'murderer', 'detective']
 * detective_chance: number,
 * murderer_chance: number,
 * // nope. (~700 lines left)
 * },
 * BuildBattle: {
 * coins: number,
 * // ~56 lines left
 * },
 * TNTGames,
 * Duels,
 * SpeedUHC,
 * Arena,
 * Pit,
 * MCGO,
 * Battleground,
 * SuperSmash,
 * Walls,
 * VampireZ,
 * Quake,
 * SkyClash,
 * Housing,
 * Legacy,
 * SkyBlock: {
 *   profiles: {[uuid: string]: {profile_id: string, cute_name: string}}
 * },
 * }} Stats
 *
 * -----
 *
 * @typedef {{
 * 'skywars_wins_mega': number,
 * 'skywars_cages': number,
 * 'skywars_kits_solo': number,
 * 'skywars_kills_solo': number,
 * 'skywars_kills_mega': number,
 * 'skywars_kills_team': number,
 * 'skywars_wins_solo': number,
 * 'skywars_kits_mega': number,
 * 'skywars_kits_team': number,
 * 'skywars_wins_team': number,
 * 'general_wins': number,
 * 'general_challenger': number,
 * 'arcade_miniwalls_winner': number,
 * 'arcade_arcade_winner': number,
 * 'arcade_arcade_banker': number,
 * 'uhc_hunter': number,
 * 'uhc_champion': number,
 * 'uhc_moving_up': number,
 * 'uhc_bounty': number,
 * 'arcade_team_work': number,
 * 'truecombat_kit_hoarder_solo': number,
 * 'truecombat_kit_hoarder_team': number,
 * 'buildbattle_buildbattle_points': number,
 * 'bedwars_level': number,
 * 'bedwars_level': number,
 * 'bedwars_loot_box': number,
 * 'christmas2017_santa_says_rounds': number,
 * 'buildbattle_build_battle_voter': number,
 * 'buildbattle_build_battle_points': number,
 * 'buildbattle_build_battle_score': number,
 * 'arcade_zombie_killer': number,
 * 'tntgames_tnt_tag_wins': number,
 * 'tntgames_pvp_run_wins': number,
 * 'tntgames_tnt_wizards_wins': number,
 * 'tntgames_bow_spleef_wins': number,
 * 'tntgames_pvp_run_killer': number,
 * 'tntgames_tnt_run_wins': number,
 * 'tntgames_tnt_triathlon': number,
 * 'general_coins': number,
 * 'tntgames_tnt_banked': number,
 * 'bedwars_beds': number,
 * 'blitz_wins_teams': number,
 * 'blitz_war_veteran': number,
 * 'blitz_wins': number,
 * 'blitz_looter': number,
 * 'walls3_jack_of_all_trades': number,
 * 'bedwars_bedwars_killer': number,
 * 'arcade_zombies_round_progression': number,
 * 'tntgames_clinic': number,
 * 'buildbattle_guess_the_build_guesses': number,
 * 'blitz_kills': number,
 * 'blitz_coins': number,
 * 'blitz_kit_expert': number,
 * 'blitz_kit_experience_collector': number,
 * 'walls3_coins': number,
 * 'walls3_guardian': number,
 * 'general_quest_master': number,
 * 'arcade_farmhunt_dominator': number,
 * 'murdermystery_hoarder': number,
 * 'murdermystery_wins_as_survivor': number,
 * 'speeduhc_hunter': number,
 * 'murdermystery_kills_as_murderer': number,
 * 'gingerbread_banker': number,
 * 'arena_climb_the_ranks': number,
 * 'skyclash_cards_unlocked': number,
 * 'duels_duels_traveller': number,
 * 'duels_duels_winner': number,
 * 'duels_duels_win_streak': number,
 * 'arcade_hide_and_seek_hider_kills': number,
 * 'bedwars_collectors_edition': number,
 * 'easter_throw_eggs': number,
 * 'arcade_bounty_hunter': number,
 * 'copsandcrims_cac_banker': number,
 * 'copsandcrims_headshot_kills': number,
 * 'copsandcrims_bomb_specialist': number,
 * 'copsandcrims_serial_killer': number,
 * 'copsandcrims_hero_terrorist': number,
 * 'arcade_zombies_nice_shot': number,
 * 'arcade_zombies_high_round': number,
 * 'murdermystery_wins_as_murderer': number,
 * 'quake_coins': number,
 * 'quake_kills': number,
 * 'uhc_consumer': number,
 * 'blitz_mob_master': number,
 * 'blitz_fighting_expert': number,
 * 'skyblock_excavator': number,
 * 'skyblock_combat': number,
 * 'skyblock_gatherer': number,
 * 'skyblock_harvester': number,
 * 'skyblock_angler': number,
 * 'skyblock_augmentation': number,
 * 'skyblock_treasury': number,
 * 'skyblock_concoctor': number,
 * 'skyblock_minion_lover': number,
 * 'speeduhc_promotion': number,
 * 'walls3_kills': number,
 * 'walls3_wins': number,
 * 'halloween2017_pumpkinator': number,
 * 'copsandcrims_grenade_kills': number,
 * 'skywars_heads': number,
 * 'vampirez_coins': number,
 * 'paintball_coins': number,
 * 'paintball_kills': number,
 * 'paintball_wins': number,
 * }} Achievements
 *
 * -----
 *
 * @typedef PlayerSettings
 * @property { 'NONE' | 'LOW' | 'HIGH' | 'MAX' } duelInvitePrivacy
 * @property { 'NONE' | 'LOW' | 'HIGH' | 'MAX' } privateMessagePrivacy
 * @property { 'NONE' | 'LOW' | 'HIGH' | 'MAX' } friendRequestPrivacy
 * @property { 'NONE' | 'LOW' | 'HIGH' | 'MAX' } guildInvitePrivacy
 * @property { 'OFF' | 'WEAK_FILTER' | 'STRONG_FILTER' | 'MAX' } profanityLevel_GUILD
 * @property { 'OFF' | 'WEAK_FILTER' | 'STRONG_FILTER' | 'MAX' } profanityLevel_PM
 * @property { 'OFF' | 'WEAK_FILTER' | 'STRONG_FILTER' | 'MAX' } profanityLevel_PARTY
 * @property { 'OFF' | 'WEAK_FILTER' | 'STRONG_FILTER' | 'MAX' } profanityLevel
 * @property {boolean} privateMessageSounds
 * @property {boolean} chatAlerts
 * @property {boolean} guildMessageSounds
 * @property {boolean} autoSpawnPet
 * @property {boolean} partyMessageSounds
 * @property {Compass} compass
 * @property { 'NONE' | 'LOW' | 'HIGH' | 'MAX' } partyInvitePrivacy
 * @property {boolean} guildChatVisibility
 * @property {boolean} guildOnlineList
 * @property {boolean} combatTracker
 * @property {boolean} spec_night_vision
 * @property {number} spec_speed
 * @property {boolean} showSelfStatus
 * 
 * -----
 *
 * @typedef {{
 * '30': Games,
 * '31': Games,
 * '32': Games,
 * '33': Games,
 * '34': Games,
 * '38': Games,
 * '39': Games,
 * '40': Games,
 * '41': Games,
 * '42': Games,
 * '43': Games,
 * }} Compass
 *
 * -----
 * 
 * @typedef { 'lobby-prototype'
 * | 'lobby-duels'
 * | 'lobby-prototype'
 * | 'lobby-mcgo'
 * | 'lobby-mcgo'
 * | 'lobby-uhc'
 * | 'lobby-walls3'
 * | 'lobby-hungergames'
 * | 'lobby-legacy'
 * | 'lobby-buildbattle'
 * | 'lobby-skywars'
 * | 'lobby-tntgames'
 * | 'lobby-arcade' } Games
 */
