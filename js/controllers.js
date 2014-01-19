'use strict';

/* Controllers */

angular.module('tomato.controllers', []).
  controller('menu', ['$scope', '$location', function($scope, $location) {
    $scope.menu = [
      {
        name: "番茄作品",
        url: "#!/works",
        subnav: [
          { name: "包装设计", url: "#!/works/packages" },
          { name: "店铺设计", url: "#!/works/stores" },
          { name: "标志设计", url: "#!/works/logo" },
          { name: "画册设计", url: "#!/works/album" },
          { name: "海报设计", url: "#!/works/poster"},
          { name: "卡通形象设计", url: "#!/works/mascot" },
          { name: "插画设计", url: "#!/works/illustration" }
        ]
      },
      {
        name: "番茄观点",
        url: "#!/opinion",
        subnav: [
          { name: "四个问题", url: "#!/opinion/questions" },
          { name: "三个原则", url: "#!/opinion/principles" },
          { name: "设计的目的", url: "#!/opinion/goal" }
        ]
      },
      {
        name: "合作事宜",
        url: "#!/cooperation",
        subnav: [
          { name: "设计合同", url: "#!/cooperation/contract" },
          { name: "工作流程", url: "#!/cooperation/workflow" }
        ]
      },
      {
        name: "关于我们",
        url: "#!/about",
        subnav: [
          { name: "为什么叫番茄", url: "#!/about/tomato" },
          { name: "团队成员", url: "#!/about/members" }
        ]
      },
      {
        name: "联系我们",
        url: "#!/contact"
      },
      {
        name: "加入我们",
        url: "#!/jobs"
      },
      {
        name: "博客动态",
        url: "#!/blog"
      }
    ];

    $scope.getClass = function(path) {
      var truePath = path.substr(2, path.length);
      if ($location.path().substr(0, truePath.length) == truePath) {
        return 'active'
      } else {
        return ''
      }
    }

  }])
  .controller('welcome', [function() {

  }])
  .controller('works', ['$scope', '$q', '$location', 'flickr', 'ngProgressLite', function($scope, $q, $location, flickr, ngProgressLite) {
    $scope.galleryNavigantionWidth = 0;
    $scope.photos = [];
    $scope.items =[];

    $scope.currentPhoto = {};

    $scope.setCurrentPhoto = function(photo) {
      var imgload = imagesLoaded(document.getElementById('galleryCoverImage'));
      $scope.currentPhoto = photo;
      ngProgressLite.start();
      imgload.on('done', function() {
        ngProgressLite.done();
      });
    };

    $scope.prevPhoto = function($q) {
      var photoIndex = _.indexOf($scope.photos, $scope.currentPhoto);
      if (0 == photoIndex) {
        photoIndex = $scope.photos.length;
      }
      $scope.setCurrentPhoto($scope.photos[photoIndex -1]);
    };
    $scope.nextPhoto = function() {
      var photoIndex = _.indexOf($scope.photos, $scope.currentPhoto);
      if ($scope.photos.length - 1 == photoIndex || -1 == photoIndex) {
        photoIndex = -1;
      }
      $scope.setCurrentPhoto($scope.photos[photoIndex + 1]);
    };

    var location = $location.path().substr(7);
    var pockets = [
      '72157639658062893', // 包装设计
      '72157639657815314', // 店铺设计
      '72157639656333265', // 标志设计
      '72157639657847584', // 画册设计
      '72157639658134673', // 海报设计
      '72157639658147003', // 卡通形象设计
      '72157639656386775'  // 插画设计
    ]
    var worksPocket;

    switch (location) {
      case 'packages':
        worksPocket = pockets[0];
        break;
      case 'stores':
        worksPocket = pockets[1];
        break;
      case 'logo':
        worksPocket = pockets[2];
        break;
      case 'album':
        worksPocket = pockets[3];
        break;
      case 'poster':
        worksPocket = pockets[4];
        break;
      case 'mascot':
        worksPocket = pockets[5];
        break;
      case 'illustration':
        worksPocket = pockets[6];
        break;
      default:
        worksPocket = pockets[0];
    }

    flickr.getPhotoset(worksPocket).then(function(data) {
      var parsedData = angular.fromJson(data);
      // console.log(data);
      $scope.items = parsedData.photoset.photo;

      for (var i = 0; i < $scope.items.length; i++) {
        var photo = $scope.items[i];
        $scope.photos.push({
          title: photo.title,
          thumbUrl: 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_s.jpg',
          cover: 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg'
        });
      }

      $scope.galleryNavigantionWidth = 85 * ($scope.items.length);

      $scope.currentPhoto = _.first($scope.photos);
    });

  }])
  .controller('opinion', [function() {

  }])
  .controller('cooperation', [function() {

  }])
  .controller('about', [function() {

  }])
  .controller('contact', [function() {

  }])
  .controller('jobs', [function() {

  }])
  .controller('blog', [function() {

  }]);
