# Anxiously Engaged Game

## Overview

A simple web-based game designed to teach the importance of looking for small opportunities to serve others without being distracted by daily concerns. This game is intended for Sunday school classes and educational purposes.

## Game Concept

### Apparent Objective
- Players control a character walking to work using Left/Right buttons
- At work, players sit at a desk and repeatedly press a "Work" button
- Each day runs for 30 seconds - more work button presses = more points
- This appears to be the main game mechanic

### Hidden Lesson
The real lesson emerges when players deviate from the prescribed path:
- While walking to work, one random encounter from 8 different scenarios appears each day
- No encounter repeats during a single 2-minute play session
- Players can tap on these characters to receive dialogue options asking if they'll help
- **Helping others rewards vastly more points than the simple work mechanic**
- This teaches that serving others is more rewarding than focusing solely on personal productivity

## Technical Specifications

### Platform
- Web-based game playable online via Replit server
- Simple HTML5/JavaScript implementation
- Mobile-friendly touch controls

### UI Elements
- **Score Display**: Shows current points earned
- **Day Counter**: Tracks which day the player is on
- **Timer**: Shows remaining time (2 minutes total)
- **Control Buttons**: Left/Right movement, Work, Help actions

### Game Duration
- Total game time: 2 minutes
- Each work day runs for 10 seconds
- Extended walking time to encounter NPCs
- Focus on delivering the core lesson quickly

### Controls
- **Left/Right buttons**: Move character while walking to work
- **Work button**: Earn points at the office desk
- **Tap sprites**: Interact with characters in need

## File Structure

```
/
├── README.md
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── backgrounds/
│   │   ├── alarm.png
│   │   ├── street_background.png
│   │   └── office_background.png
│   ├── characters/
│   │   ├── main_character/
│   │   │   ├── walking_left.png
│   │   │   └── walking_right.png
│   │   └── npcs/
│   │       ├── elderly_with_groceries.png
│   │       ├── child_with_bike.png
│   │       ├── person_with_heavy_bags.png
│   │       ├── lost_tourist.png
│   │       ├── person_with_flat_tire.png
│   │       ├── person_with_dropped_papers.png
│   │       ├── person_struggling_with_door.png
│   │       └── person_who_dropped_wallet.png
│   └── ui/
│       ├── left_button.png
│       ├── right_button.png
│       ├── work_button.png
│       └── help_button.png
```

## Game Flow

The game runs for exactly 2 minutes total, cycling through multiple "days" where each day consists of walking to work and working at a desk. This allows multiple opportunities to encounter NPCs and make the choice between productivity and service.

### Phase 1: Walking to Work (Daily)
1. Player starts with alarm screen and clicks "Time to Walk to Work"
2. Uses Left/Right buttons to walk towards office
3. One random NPC encounter appears (from pool of 8, no repeats per session)
4. Player can choose to help or ignore them
5. Helping provides dialogue and significant point rewards

### Phase 2: At Work
1. Player reaches office and sits at desk
2. 10-second work timer begins
3. Player repeatedly clicks "Work" button to earn points (1 point each)
4. Points earned are dramatically lower than helping others (1,000 points each)
5. After work day ends, player returns home for next day

### Phase 3: Lesson Revelation
1. Game shows point comparison at end of day
2. Emphasizes that serving others was more rewarding
3. Encourages players to prioritize service over self-focus

## Educational Objectives

- **Primary**: Teach the value of serving others over focusing solely on personal productivity
- **Secondary**: Demonstrate that opportunities to serve are all around us
- **Tertiary**: Show that small acts of service can be more meaningful than routine tasks

## Development Phases

### Phase 1: Core Mechanics
- [ ] Basic character movement
- [ ] Simple work button mechanic
- [ ] Timer system
- [ ] Point tracking

### Phase 2: Service Opportunities
- [ ] NPC sprite placement
- [ ] Dialogue system
- [ ] Help interaction mechanics
- [ ] Enhanced point rewards for service

### Phase 3: Polish
- [ ] Asset integration
- [ ] Sound effects
- [ ] Visual feedback
- [ ] Lesson reinforcement

## Asset Requirements

### Backgrounds (3 total)
- Alarm background for start screen
- Street/walking path background  
- Office interior with desk

### Character Sprites (11 total)
- Main character: walking left, walking right, idle (office background has built-in characters)
- NPCs (8 encounters): elderly person, child, person with bags, tourist, person with flat tire, person with dropped papers, person struggling with door, person who dropped wallet

### UI Elements (4 total)
- Left movement button
- Right movement button  
- Work button
- Help/interact button

### Audio
- No audio required - visual feedback only for Sunday school environment

## Target Audience

- Sunday school students (ages 8-16)
- Teachers looking for interactive lesson tools
- Anyone interested in games with positive messages

## Deployment

### Option 1: Replit (Recommended for Educators)
1. Fork this repository to your GitHub account
2. Create a new Replit project and import from GitHub
3. Run the project - Replit will automatically serve the game
4. Share the generated URL with your students

### Option 2: Local Testing
```bash
python3 server.py
```
Then visit `http://localhost:8000` in your browser

### Option 3: Any Web Server
Simply upload all files to any web hosting service. The game requires no backend processing - just static file serving.

## Technical Requirements

- Modern web browser with HTML5 support
- Touch screen support for mobile devices
- No additional plugins or downloads required
- Works on any static web host 