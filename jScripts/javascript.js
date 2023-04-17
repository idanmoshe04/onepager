// פונקציה לשליחת המידע לצד השרת
async function Post() {
    //שורה זו מקבלת את כל הקבצים שנבחרו על ידי המשתמש מאלמנט קלט עם מזהה של "uploadFile"
    //ומאחסנת אותם במשתנה שנקרא קבצים.
    var files = document.getElementById("uploadFile").files;
    //שורה זו יוצרת מופע חדש של אובייקט FormData, 
    //המשמש לשליחת נתונים לשרת 
    var formData = new FormData();
    //שורה זו מתחילה לולאה החוזרת על כל קובץ במערך הקבצים.
    for (var i = 0; i < files.length; i++) {
        //שורה זו יוצרת אובייקט חדש בשם fileInfo 
        //המכיל מידע על הקובץ הנוכחי שמועלה, כולל שמו, גודלו וסוגו.
      var fileInfo = {
        
        name: files[i].name,
        size: files[i].size,
        type: files[i].type
      };
      //שורה זו מוסיפה את הקובץ הנוכחי לאובייקט FormData
      //תוך שימוש בשם "קובץ" המשורשר לאינדקס הנוכחי של הלולאה.
      formData.append("file" + i, files[i]);
      //שורה זו מוסיפה את האובייקט fileInfo לאובייקט FormData, תוך שימוש בשם "fileInfo" 
      //המשורשר לאינדקס הנוכחי של הלולאה, והמרת האובייקט למחרוזת JSON באמצעות
      formData.append("fileInfo" + i, JSON.stringify(fileInfo));
    }
      
    //  שמירת הנתיב לבסיס הנתונים עם פרמטר של הנושא שנבחר
    //  צריך לעדכן בהתאם לנתיב של ה-API שלכם
    const url = `https://localhost:7299/WeatherForecast`;
    //  שמירת הפרמטרים לשליפה: סוג השליפה ומבנה הנתונים שיוחזר
    const params = {
        method: "POST",
        body: formData
    }// ביצוע הקריאה לשרת, נשלח את הנתיב והפרמטרים שהגדרנו
    const response = await fetch(url, params);
    //  במידה והערך שהוחזר תקין
    if (response.ok) {
        //  נמיר את התוכן שחזר לפורמט json
        const data = await response.json();
        console.log(data);
        document.getElementById("preview").innerHTML = "הקבצים נשלחו בהצלחה!!";

    } else {
        // נציג את השגיאות במידה והערך לא תקין
        const errors = response.text();
        console.log(errors);
        document.getElementById("preview").innerHTML = "הקבצים אינם "
    }
}

//שורת קוד זו מבטיחה שהקוד מבוצע במצב קפדני.
"use strict";
//שורת הקוד הזו מכריזה על פונקציה בשם 
//dragNdrop
//המקבלת פרמטר מסוג אירוע
function dragNdrop(event) {
    //שורת קוד זו מכריזה על משתנה בשם x
    //מתוך התוכן הקיים בתגית בעלת ID uploadFile
    var x = document.getElementById("uploadFile");
    //החרזת משתנה טקסט ריק
    var txt = "";
    //בדיקה של הקבצים הקיים במשתנה X
    if ('files' in x) {
        //אם האורך שווה ל- 0
        if (x.files.length == 0) {
            //תרשום בחירת קובץ אחד או יותר
            txt = "Select one or more files.";
        } else {
            //לולאה שועברת על כל הקבצים ומדפיסה את שמם
            for (var i = 0; i < x.files.length; i++) {
                txt += "<strong> files" + (i + 1) + "</strong>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += file.name + "<br>";
                }
            }
        }
    }
    //כתיבת התוכן שנשמר בתוך TXT
    //בתגית בעלת ה ID PREVIEW
    document.getElementById("preview").innerHTML = txt;
}

//קוד זה משמש לשינוי המחלקה של אלמנט עם המזהה של "uploadFile"
//בעת מצב גרירה
function drag() {
    document.getElementById('uploadFile').parentNode.className = 'draging dragBox';
}
//קוד זה משמש לשינוי המחלקה של אלמנט עם המזהה של "uploadFile"
//בעת מצב עזיבה העכבר
function drop() {
    document.getElementById('uploadFile').parentNode.className = 'dragBox';
}



