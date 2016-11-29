NAME = <%= appname %>
VERSION = $(shell cat app/component/component.resource.json | sed -n 's/"version"//p' | tr -d '", :')

PROJECT = $(NAME)

DISTDIR = $(PROJECT)-$(VERSION)
ARCHIVE = $(CURDIR)/$(DISTDIR).tar.gz

INSTALL_DIR = $(DESTDIR)/var/www/webapp/server/market/
STAGING_DIR = $(CURDIR)/staging
PROJECT_STAGING_DIR = $(STAGING_DIR)/$(DISTDIR)

TARGET_FILES = \
	<%= uuid %>.tar.gz
DIST_FILES= \
	$(TARGET_FILES) \
	Makefile

INSTALL_FILES=$(addprefix $(INSTALL_DIR)/,$(TARGET_FILES))
STAGING_FILES=$(addprefix $(PROJECT_STAGING_DIR)/,$(DIST_FILES))


all:

clean:
	rm -rf $(DISTDIR)*.tar.gz $(STAGING_DIR)
	@rm -rf .coverage
	@find ./ -name *.pyc | xargs rm -rf

distclean: clean


dist: $(ARCHIVE)

$(ARCHIVE): $(STAGING_FILES)
	@mkdir -p $(STAGING_DIR)
	cd $(STAGING_DIR) && \
		tar zcf $@ $(DISTDIR)

$(PROJECT_STAGING_DIR)/%: %
	@mkdir -p $(dir $@)
	@cp -a $< $@

install: $(INSTALL_FILES)

$(INSTALL_DIR)/%: %
	mkdir -p $(dir $@)
	cp -a $< $@

uninstall:
	-rm $(addprefix $(INSTALL_DIR)/,$(TARGET_FILES))

.PHONY: clean dist
