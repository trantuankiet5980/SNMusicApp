# SNMusicApp

# Git
-- Hai branch: tuankiet, vantoan. Mỗi cá nhân code push lên branch của mình, không được push bằng branch main vì sẽ gây xung đột
-- Lệnh:
1. Check branch: git branch
2. Chuyển branch: git checkout tuankiet
3. git add .
4. git commit -m ""
5. git push
6. Sau khi push, lên trang git nhấn Pull requests để gộp sang branch main
7. có code mới thì sang branch main để gộp code từ main sang branch của mình: git branch main, git merge main tuankiet, sau đó chuyển sang lại branch của mình: git checkout tuankiet
8. git pull
-------------------------THƯ VIỆN-------------------------
1. Create App: npx create-expo-app nameApp --template blank
	Error: npm install -g npm@10.9.0
	Run web: npx expo install react-native-web react-dom @expo/metro-runtime
2. SafeAreaView: npx expo install react-native-safe-area-context
3. Color linear: npx expo install expo-linear-gradient
4. Navigation: 4.1. Navigation và Stack: npm install @react-navigation/native @react-navigation/native-stack
	       4.2. Thanh click đổi trang: npm install @react-navigation/bottom-tabs
	       		4.2.1. Đổi trang từ 1 trang: npm install react-native-tab-view
5. Icon: npm install react-native-vector-icons
	https://oblador.github.io/react-native-vector-icons/
6. Storage: npm i @react-native-async-storage/async-storage


